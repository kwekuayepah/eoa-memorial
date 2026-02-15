// Shared Types

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
