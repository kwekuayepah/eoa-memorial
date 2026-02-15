"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertCircle } from "lucide-react";

const tributeFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  relationship: z.string().max(50).optional(),
  message: z
    .string()
    .min(1, "Message is required")
    .max(1000, "Message must be 1000 characters or less"),
  publishPermission: z.enum(["yes", "no"], {
    required_error: "Please select a publish permission option",
  }),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to share your message with the family",
  }),
});

type TributeFormData = z.infer<typeof tributeFormSchema>;

const relationshipOptions = [
  "Family",
  "Friend",
  "Classmate",
  "Colleague",
  "Church Member",
  "Other",
] as const;

export function TributeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const prefersReducedMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<TributeFormData>({
    resolver: zodResolver(tributeFormSchema),
    defaultValues: {
      publishPermission: undefined,
      consent: false,
    },
  });

  const messageLength = watch("message")?.length || 0;

  const onSubmit = async (data: TributeFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.relationship) {
        formData.append("relationship", data.relationship);
      }
      formData.append("message", data.message);
      formData.append("publishPermission", data.publishPermission);
      formData.append("consent", String(data.consent));

      const response = await fetch("/api/tributes", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit tribute");
      }

      setSubmitStatus("success");
      reset();
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="tributes" className="bg-bg py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title="Share Your Memories"
            subtitle="We invite you to share your memories, stories, and messages of condolence. Your words will be a source of comfort to the family and a lasting tribute to Edward's life."
          />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block font-sans text-sm font-medium text-text"
              >
                Your Name <span className="text-rose-deep">*</span>
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="w-full rounded-md border border-border bg-bg-card px-4 py-2 font-sans text-base text-text focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold-light"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-rose-deep">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Relationship */}
            <div>
              <label
                htmlFor="relationship"
                className="mb-2 block font-sans text-sm font-medium text-text"
              >
                Relationship (Optional)
              </label>
              <select
                id="relationship"
                {...register("relationship")}
                className="w-full rounded-md border border-border bg-bg-card px-4 py-2 font-sans text-base text-text focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold-light"
              >
                <option value="">Select relationship</option>
                {relationshipOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block font-sans text-sm font-medium text-text"
              >
                Your Tribute <span className="text-rose-deep">*</span>
              </label>
              <textarea
                id="message"
                rows={6}
                {...register("message")}
                className="w-full rounded-md border border-border bg-bg-card px-4 py-2 font-sans text-base text-text focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold-light"
                placeholder="Share your memories and thoughts..."
              />
              <div className="mt-1 flex justify-between">
                {errors.message && (
                  <p className="text-sm text-rose-deep">
                    {errors.message.message}
                  </p>
                )}
                <p
                  className={`ml-auto text-sm ${messageLength > 1000 ? "text-rose-deep" : "text-text-light"
                    }`}
                >
                  {messageLength} / 1000
                </p>
              </div>
            </div>

            {/* Publish Permission */}
            <div>
              <label className="mb-2 block font-sans text-sm font-medium text-text">
                Permission to Publish <span className="text-rose-deep">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="yes"
                    {...register("publishPermission")}
                    className="h-4 w-4 text-gold focus:ring-gold"
                  />
                  <span className="font-sans text-base text-text">
                    Yes — publish my message
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="no"
                    {...register("publishPermission")}
                    className="h-4 w-4 text-gold focus:ring-gold"
                  />
                  <span className="font-sans text-base text-text">
                    No — keep private for family only
                  </span>
                </label>
              </div>
              {errors.publishPermission && (
                <p className="mt-1 text-sm text-rose-deep">
                  {errors.publishPermission.message}
                </p>
              )}
            </div>

            {/* Consent */}
            <div>
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  {...register("consent")}
                  className="mt-1 h-4 w-4 text-gold focus:ring-gold"
                />
                <span className="font-sans text-sm text-text">
                  I consent to this message being shared with the family.{" "}
                  <span className="text-rose-deep">*</span>
                </span>
              </label>
              {errors.consent && (
                <p className="mt-1 text-sm text-rose-deep">
                  {errors.consent.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Submitting..." : "Submit Tribute"}
            </Button>

            {/* Success/Error Messages */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-md bg-green-50 border border-green-200 p-4 text-green-800"
              >
                <CheckCircle2 className="h-5 w-5" />
                <p className="font-sans text-sm">
                  Thank you. Your tribute has been received and will be shared
                  with the family.
                </p>
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-md bg-red-50 border border-red-200 p-4 text-red-800"
              >
                <AlertCircle className="h-5 w-5" />
                <p className="font-sans text-sm">{errorMessage}</p>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
