export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      creators: {
        Row: {
          id: number
          name: string
          links: Json
        }
        Insert: {
          id?: number
          name: string
          links?: Json
        }
        Update: {
          id?: number
          name?: string
          links?: Json
        }
      }
      podcasts: {
        Row: {
          id: number
          title: string
          link: string
          transcription: string
          creator_id: number
        }
        Insert: {
          id?: number
          title: string
          link: string
          transcription: string
          creator_id: number
        }
        Update: {
          id?: number
          title?: string
          link?: string
          transcription?: string
          creator_id?: number
        }
      }
      podcasts_tags: {
        Row: {
          id: number
          podcast: number
          tag: number
        }
        Insert: {
          id?: number
          podcast: number
          tag: number
        }
        Update: {
          id?: number
          podcast?: number
          tag?: number
        }
      }
      tags: {
        Row: {
          id: number
          name: string
          color: string
        }
        Insert: {
          id?: number
          name: string
          color: string
        }
        Update: {
          id?: number
          name?: string
          color?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
