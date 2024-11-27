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
      folder: {
        Row: {
          author_id: string | null
          created_at: string
          emojis: string[] | null
          id: string
          name: string
          order_in_panel: number | null
          show: boolean | null
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          created_at?: string
          emojis?: string[] | null
          id?: string
          name: string
          order_in_panel?: number | null
          show?: boolean | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          created_at?: string
          emojis?: string[] | null
          id?: string
          name?: string
          order_in_panel?: number | null
          show?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "folder_author_id_user_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      list: {
        Row: {
          author_id: string | null
          created_at: string
          description: string | null
          emojis: string[] | null
          folder_id: string | null
          id: string
          name: string
          order_in_folder: number | null
          show: boolean | null
          theme: Json | null
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          created_at?: string
          description?: string | null
          emojis?: string[] | null
          folder_id?: string | null
          id?: string
          name: string
          order_in_folder?: number | null
          show?: boolean | null
          theme?: Json | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          created_at?: string
          description?: string | null
          emojis?: string[] | null
          folder_id?: string | null
          id?: string
          name?: string
          order_in_folder?: number | null
          show?: boolean | null
          theme?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "list_author_id_user_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "list_folder_id_folder_id_fk"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "folder"
            referencedColumns: ["id"]
          },
        ]
      }
      list_task: {
        Row: {
          created_at: string
          id: string
          list_id: string
          order_in_list: number
          task_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          list_id: string
          order_in_list?: number
          task_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          list_id?: string
          order_in_list?: number
          task_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "list_task_list_id_list_id_fk"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "list_task_task_id_task_id_fk"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "task"
            referencedColumns: ["id"]
          },
        ]
      }
      smart_list_task: {
        Row: {
          created_at: string
          id: string
          order_in_list: number
          smart_list_id: Database["public"]["Enums"]["smart_list_id"] | null
          task_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          order_in_list?: number
          smart_list_id?: Database["public"]["Enums"]["smart_list_id"] | null
          task_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          order_in_list?: number
          smart_list_id?: Database["public"]["Enums"]["smart_list_id"] | null
          task_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "smart_list_task_task_id_task_id_fk"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "task"
            referencedColumns: ["id"]
          },
        ]
      }
      task: {
        Row: {
          archived: boolean | null
          author_id: string | null
          created_at: string
          deleted: boolean | null
          due_at: string | null
          emojis: string[] | null
          id: string
          label: string
          note: Json | null
          pinned: boolean | null
          starred: boolean | null
          step_index: number | null
          step_of: string | null
          task_status: Database["public"]["Enums"]["task_status"] | null
          updated_at: string | null
        }
        Insert: {
          archived?: boolean | null
          author_id?: string | null
          created_at?: string
          deleted?: boolean | null
          due_at?: string | null
          emojis?: string[] | null
          id?: string
          label: string
          note?: Json | null
          pinned?: boolean | null
          starred?: boolean | null
          step_index?: number | null
          step_of?: string | null
          task_status?: Database["public"]["Enums"]["task_status"] | null
          updated_at?: string | null
        }
        Update: {
          archived?: boolean | null
          author_id?: string | null
          created_at?: string
          deleted?: boolean | null
          due_at?: string | null
          emojis?: string[] | null
          id?: string
          label?: string
          note?: Json | null
          pinned?: boolean | null
          starred?: boolean | null
          step_index?: number | null
          step_of?: string | null
          task_status?: Database["public"]["Enums"]["task_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "task_author_id_user_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_step_of_task_id_fk"
            columns: ["step_of"]
            isOneToOne: false
            referencedRelation: "task"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          auth_user_id: string
          created_at: string
          firstname: string | null
          id: string
          lastname: string | null
          settings: Json | null
          updated_at: string | null
        }
        Insert: {
          auth_user_id: string
          created_at?: string
          firstname?: string | null
          id?: string
          lastname?: string | null
          settings?: Json | null
          updated_at?: string | null
        }
        Update: {
          auth_user_id?: string
          created_at?: string
          firstname?: string | null
          id?: string
          lastname?: string | null
          settings?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fk"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user_view"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      user_view: {
        Row: {
          email: string | null
          email_confirmed_at: string | null
          firstname: string | null
          id: string | null
          lastname: string | null
          phone: string | null
          settings: Json | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      smart_list_id: "all-tasks" | "starred" | "pinned" | "archived" | "deleted"
      task_status: "to-do" | "done"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
