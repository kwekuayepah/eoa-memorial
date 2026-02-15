import { supabase } from "@/lib/supabaseClient";

export type Tribute = {
  id: string;
  name: string;
  relationship?: string;
  message: string;
  photo_url?: string;
  publish_approved: boolean;
  consent: boolean;
  created_at: string;
};

export const db = {
  async insertTribute(
    tribute: Omit<Tribute, "id" | "created_at">
  ): Promise<Tribute> {
    const { data, error } = await supabase
      .from("tributes")
      .insert([tribute])
      .select()
      .single();

    if (error) {
      console.error("Error inserting tribute:", error);
      throw new Error(error.message);
    }

    return data;
  },

  async getTributes(options: {
    page: number;
    limit: number;
    approvedOnly?: boolean;
  }): Promise<{ tributes: Tribute[]; total: number }> {
    const { page, limit, approvedOnly } = options;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("tributes")
      .select("*", { count: "exact" }) // count: 'exact' to get total count
      .order("created_at", { ascending: false })
      .range(from, to);

    if (approvedOnly) {
      query = query.eq("publish_approved", true);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching tributes:", error);
      throw new Error(error.message);
    }

    return {
      tributes: (data as Tribute[]) || [],
      total: count || 0,
    };
  },
};
