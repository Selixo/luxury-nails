export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bans: {
        Row: {
          banned_at: string
          banned_by: string
          client_id: string
          id: string
          note: string | null
          reason: string
          unbanned_at: string | null
          unbanned_by: string | null
        }
        Insert: {
          banned_at?: string
          banned_by: string
          client_id: string
          id?: string
          note?: string | null
          reason: string
          unbanned_at?: string | null
          unbanned_by?: string | null
        }
        Update: {
          banned_at?: string
          banned_by?: string
          client_id?: string
          id?: string
          note?: string | null
          reason?: string
          unbanned_at?: string | null
          unbanned_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bans_banned_by_fkey"
            columns: ["banned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bans_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bans_unbanned_by_fkey"
            columns: ["unbanned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          cancellation_reason: string | null
          client_id: string
          created_at: string
          date: string
          google_calendar_event_id: string | null
          id: string
          inspiration_url: string | null
          notes: string | null
          service_id: string
          status: string
          stylist_note: string | null
          time: string
        }
        Insert: {
          cancellation_reason?: string | null
          client_id: string
          created_at?: string
          date: string
          google_calendar_event_id?: string | null
          id?: string
          inspiration_url?: string | null
          notes?: string | null
          service_id: string
          status?: string
          stylist_note?: string | null
          time: string
        }
        Update: {
          cancellation_reason?: string | null
          client_id?: string
          created_at?: string
          date?: string
          google_calendar_event_id?: string | null
          id?: string
          inspiration_url?: string | null
          notes?: string | null
          service_id?: string
          status?: string
          stylist_note?: string | null
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      login_attempts: {
        Row: {
          count: number
          locked_until: string | null
          phone: string
          updated_at: string
        }
        Insert: {
          count?: number
          locked_until?: string | null
          phone: string
          updated_at?: string
        }
        Update: {
          count?: number
          locked_until?: string | null
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          last_name: string
          name: string
          phone: string
          role: string
        }
        Insert: {
          created_at?: string
          id: string
          last_name?: string
          name: string
          phone: string
          role?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_name?: string
          name?: string
          phone?: string
          role?: string
        }
        Relationships: []
      }
      ratings: {
        Row: {
          booking_id: string
          comment: string | null
          created_at: string
          id: string
          stars: number
        }
        Insert: {
          booking_id: string
          comment?: string | null
          created_at?: string
          id?: string
          stars: number
        }
        Update: {
          booking_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          stars?: number
        }
        Relationships: [
          {
            foreignKeyName: "ratings_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          active: boolean
          category: string
          duration_min: number
          id: string
          name: string
          price: number
        }
        Insert: {
          active?: boolean
          category: string
          duration_min: number
          id?: string
          name: string
          price: number
        }
        Update: {
          active?: boolean
          category?: string
          duration_min?: number
          id?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
      settings: {
        Row: {
          break_min: number
          google_access_token: string | null
          google_connected_email: string | null
          google_refresh_token: string | null
          google_token_expiry: string | null
          id: string
          working_hours: Json
        }
        Insert: {
          break_min?: number
          google_access_token?: string | null
          google_connected_email?: string | null
          google_refresh_token?: string | null
          google_token_expiry?: string | null
          id?: string
          working_hours?: Json
        }
        Update: {
          break_min?: number
          google_access_token?: string | null
          google_connected_email?: string | null
          google_refresh_token?: string | null
          google_token_expiry?: string | null
          id?: string
          working_hours?: Json
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
