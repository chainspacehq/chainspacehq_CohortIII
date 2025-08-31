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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          accommodation_plan: string | null
          application_id: string
          applied_to_others: string | null
          biggest_challenge: string
          blockchain_familiarity: string
          can_attend_in_person: string
          can_commit_time: string
          can_pay_logistics: string
          code_of_conduct_agreement: boolean
          coding_projects: string | null
          cohort_id: string | null
          commitment_statement: boolean
          created_at: string
          current_location: string
          current_profession: string | null
          date_of_birth: string
          distance_from_uyo: string
          education_level: string | null
          email: string
          english_proficiency: string
          fall_behind_strategy: string
          field_of_study: string | null
          full_name: string
          gender: string | null
          github_profile: string | null
          group_project_experience: string | null
          has_laptop: string
          how_did_you_hear: string
          id: string
          in_person_explanation: string | null
          information_accuracy: boolean
          internet_access: string
          learning_style: Json
          linkedin_profile: string | null
          logistics_understanding: boolean
          other_source: string | null
          personal_projects: string | null
          phone: string
          programming_experience: string
          referrer_name: string | null
          reviewed_at: string | null
          reviewer_notes: string | null
          special_circumstances: string | null
          status: string | null
          submitted_at: string
          unique_about_you: string | null
          updated_at: string
          weekday_availability: string
          what_to_build: string
          why_chainspace: string | null
          why_web3: string
          willing_to_mentor: string | null
          work_study_status: string
        }
        Insert: {
          accommodation_plan?: string | null
          application_id: string
          applied_to_others?: string | null
          biggest_challenge: string
          blockchain_familiarity: string
          can_attend_in_person: string
          can_commit_time: string
          can_pay_logistics: string
          code_of_conduct_agreement?: boolean
          coding_projects?: string | null
          cohort_id?: string | null
          commitment_statement?: boolean
          created_at?: string
          current_location: string
          current_profession?: string | null
          date_of_birth: string
          distance_from_uyo: string
          education_level?: string | null
          email: string
          english_proficiency: string
          fall_behind_strategy: string
          field_of_study?: string | null
          full_name: string
          gender?: string | null
          github_profile?: string | null
          group_project_experience?: string | null
          has_laptop: string
          how_did_you_hear: string
          id?: string
          in_person_explanation?: string | null
          information_accuracy?: boolean
          internet_access: string
          learning_style?: Json
          linkedin_profile?: string | null
          logistics_understanding?: boolean
          other_source?: string | null
          personal_projects?: string | null
          phone: string
          programming_experience: string
          referrer_name?: string | null
          reviewed_at?: string | null
          reviewer_notes?: string | null
          special_circumstances?: string | null
          status?: string | null
          submitted_at?: string
          unique_about_you?: string | null
          updated_at?: string
          weekday_availability: string
          what_to_build: string
          why_chainspace?: string | null
          why_web3: string
          willing_to_mentor?: string | null
          work_study_status: string
        }
        Update: {
          accommodation_plan?: string | null
          application_id?: string
          applied_to_others?: string | null
          biggest_challenge?: string
          blockchain_familiarity?: string
          can_attend_in_person?: string
          can_commit_time?: string
          can_pay_logistics?: string
          code_of_conduct_agreement?: boolean
          coding_projects?: string | null
          cohort_id?: string | null
          commitment_statement?: boolean
          created_at?: string
          current_location?: string
          current_profession?: string | null
          date_of_birth?: string
          distance_from_uyo?: string
          education_level?: string | null
          email?: string
          english_proficiency?: string
          fall_behind_strategy?: string
          field_of_study?: string | null
          full_name?: string
          gender?: string | null
          github_profile?: string | null
          group_project_experience?: string | null
          has_laptop?: string
          how_did_you_hear?: string
          id?: string
          in_person_explanation?: string | null
          information_accuracy?: boolean
          internet_access?: string
          learning_style?: Json
          linkedin_profile?: string | null
          logistics_understanding?: boolean
          other_source?: string | null
          personal_projects?: string | null
          phone?: string
          programming_experience?: string
          referrer_name?: string | null
          reviewed_at?: string | null
          reviewer_notes?: string | null
          special_circumstances?: string | null
          status?: string | null
          submitted_at?: string
          unique_about_you?: string | null
          updated_at?: string
          
          weekday_availability?: string
          what_to_build?: string
          why_chainspace?: string | null
          why_web3?: string
          willing_to_mentor?: string | null
          work_study_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
        ]
      }
      cohorts: {
        Row: {
          cohort_number: number
          created_at: string
          current_participants: number | null
          description: string | null
          end_date: string | null
          id: string
          max_participants: number | null
          name: string
          start_date: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          cohort_number: number
          created_at?: string
          current_participants?: number | null
          description?: string | null
          end_date?: string | null
          id?: string
          max_participants?: number | null
          name: string
          start_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          cohort_number?: number
          created_at?: string
          current_participants?: number | null
          description?: string | null
          end_date?: string | null
          id?: string
          max_participants?: number | null
          name?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          
        }
        Relationships: []
      }
      volunteer_applications: {
        Row: {
          availability: string | null
          created_at: string
          email: string
          experience_level: string | null
          full_name: string
          id: string
          motivation: string | null
          phone: string
          portfolio_url: string | null
          position: string
          reviewed_at: string | null
          reviewer_notes: string | null
          skills: Json | null
          status: string | null
          submitted_at: string
          updated_at: string
           | null
        }
        Insert: {
          availability?: string | null
          created_at?: string
          email: string
          experience_level?: string | null
          full_name: string
          id?: string
          motivation?: string | null
          phone: string
          portfolio_url?: string | null
          position?: string
          reviewed_at?: string | null
          reviewer_notes?: string | null
          skills?: Json | null
          status?: string | null
          submitted_at?: string
          updated_at?: string
           | null
        }
        Update: {
          availability?: string | null
          created_at?: string
          email?: string
          experience_level?: string | null
          full_name?: string
          id?: string
          motivation?: string | null
          phone?: string
          portfolio_url?: string | null
          position?: string
          reviewed_at?: string | null
          reviewer_notes?: string | null
          skills?: Json | null
          status?: string | null
          submitted_at?: string
          updated_at?: string
           | null
        }
        Relationships: []
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
