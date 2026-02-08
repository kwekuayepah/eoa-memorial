// Simple in-memory storage for tributes (no external database needed)
// In production, you could replace this with Vercel KV, a file-based solution, or Supabase

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

// In-memory store (resets on server restart)
// For production, consider using Vercel KV or a file-based solution
const tributesStore: Tribute[] = [];

export const db = {
  async insertTribute(tribute: Omit<Tribute, "id" | "created_at">): Promise<Tribute> {
    const newTribute: Tribute = {
      ...tribute,
      id: `tribute-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      created_at: new Date().toISOString(),
    };
    tributesStore.push(newTribute);
    return newTribute;
  },

  async getTributes(options: {
    page: number;
    limit: number;
    approvedOnly?: boolean;
  }): Promise<{ tributes: Tribute[]; total: number }> {
    let filtered = tributesStore;

    if (options.approvedOnly) {
      filtered = filtered.filter((t) => t.publish_approved);
    }

    // Sort by created_at descending
    filtered.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const offset = (options.page - 1) * options.limit;
    const paginated = filtered.slice(offset, offset + options.limit);

    return {
      tributes: paginated,
      total: filtered.length,
    };
  },
};
