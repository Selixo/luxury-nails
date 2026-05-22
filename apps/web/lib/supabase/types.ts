export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          phone: string
          name: string
          role: "client" | "admin"
          created_at: string
        }
        Insert: {
          id: string
          phone: string
          name: string
          role?: "client" | "admin"
          created_at?: string
        }
        Update: {
          phone?: string
          name?: string
          role?: "client" | "admin"
        }
      }
      services: {
        Row: {
          id: string
          name: string
          category: string
          price: number
          duration_min: number
          active: boolean
        }
        Insert: {
          id?: string
          name: string
          category: string
          price: number
          duration_min: number
          active?: boolean
        }
        Update: {
          name?: string
          category?: string
          price?: number
          duration_min?: number
          active?: boolean
        }
      }
      bookings: {
        Row: {
          id: string
          client_id: string
          service_id: string
          date: string
          time: string
          status: "pending" | "confirmed" | "completed" | "cancelled"
          notes: string | null
          inspiration_url: string | null
          cancellation_reason: string | null
          stylist_note: string | null
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          service_id: string
          date: string
          time: string
          status?: "pending" | "confirmed" | "completed" | "cancelled"
          notes?: string | null
          inspiration_url?: string | null
          cancellation_reason?: string | null
          stylist_note?: string | null
          created_at?: string
        }
        Update: {
          status?: "pending" | "confirmed" | "completed" | "cancelled"
          notes?: string | null
          inspiration_url?: string | null
          cancellation_reason?: string | null
          stylist_note?: string | null
        }
      }
      bans: {
        Row: {
          id: string
          client_id: string
          reason: string
          note: string | null
          banned_by: string
          banned_at: string
        }
        Insert: {
          id?: string
          client_id: string
          reason: string
          note?: string | null
          banned_by: string
          banned_at?: string
        }
        Update: {
          reason?: string
          note?: string | null
        }
      }
      ratings: {
        Row: {
          id: string
          booking_id: string
          stars: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          stars: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          stars?: number
          comment?: string | null
        }
      }
      settings: {
        Row: {
          id: string
          working_hours: Json
          break_min: number
        }
        Insert: {
          id?: string
          working_hours: Json
          break_min?: number
        }
        Update: {
          working_hours?: Json
          break_min?: number
        }
      }
    }
  }
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type Service = Database["public"]["Tables"]["services"]["Row"]
export type Booking = Database["public"]["Tables"]["bookings"]["Row"]
export type Ban = Database["public"]["Tables"]["bans"]["Row"]
export type Rating = Database["public"]["Tables"]["ratings"]["Row"]
export type Settings = Database["public"]["Tables"]["settings"]["Row"]
