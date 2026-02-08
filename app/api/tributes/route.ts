import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, number>();

const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX_REQUESTS = 1;

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0] || realIP || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const lastRequest = rateLimitMap.get(ip);

  if (!lastRequest || now - lastRequest > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, now);
    return true;
  }

  return false;
}

const tributeSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  relationship: z.string().max(50).optional(),
  message: z.string().min(1, "Message is required").max(1000),
  publishPermission: z.enum(["yes", "no"]),
  consent: z.boolean().refine((val) => val === true, {
    message: "Consent is required",
  }),
});

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const data = {
      name: formData.get("name") as string,
      relationship: formData.get("relationship") as string | null,
      message: formData.get("message") as string,
      publishPermission: formData.get("publishPermission") as string,
      consent: formData.get("consent") === "true",
    };

    // Validate
    const validated = tributeSchema.parse(data);

    // Handle photo upload if present
    let photoUrl: string | null = null;
    const photoFile = formData.get("photo") as File | null;

    if (photoFile && photoFile.size > 0) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (photoFile.size > maxSize) {
        return NextResponse.json(
          { error: "Photo size must be less than 5MB" },
          { status: 400 }
        );
      }

      // Save photo to public/uploads directory
      try {
        const uploadsDir = join(process.cwd(), "public", "uploads", "tributes");
        await mkdir(uploadsDir, { recursive: true });

        const fileExt = photoFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = join(uploadsDir, fileName);

        const fileBuffer = await photoFile.arrayBuffer();
        await writeFile(filePath, Buffer.from(fileBuffer));

        photoUrl = `/uploads/tributes/${fileName}`;
      } catch (error) {
        console.error("Photo upload error:", error);
        // Continue without photo if upload fails
      }
    }

    // Insert into in-memory database
    const tribute = await db.insertTribute({
      name: validated.name,
      relationship: validated.relationship || undefined,
      message: validated.message,
      photo_url: photoUrl || undefined,
      publish_approved: validated.publishPermission === "yes",
      consent: validated.consent,
    });

    return NextResponse.json(
      {
        message:
          "Thank you. Your tribute has been received and will be shared with the family.",
        id: tribute.id,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Fetch approved tributes
    const { tributes, total } = await db.getTributes({
      page,
      limit,
      approvedOnly: true,
    });

    return NextResponse.json({
      tributes,
      pagination: {
        page,
        limit,
        total,
        hasMore: total > page * limit,
      },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
