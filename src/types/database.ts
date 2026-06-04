export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          status: "active" | "unsubscribed";
          source: string;
          subscribed_at: string;
          unsubscribed_at: string | null;
          metadata: Json;
        };
        Insert: {
          id?: string;
          email: string;
          status?: "active" | "unsubscribed";
          source?: string;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
          metadata?: Json;
        };
        Update: {
          id?: string;
          email?: string;
          status?: "active" | "unsubscribed";
          source?: string;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
          metadata?: Json;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
