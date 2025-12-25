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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      academic_semesters: {
        Row: {
          code: string
          created_at: string | null
          end_date: string
          id: string
          is_current: boolean | null
          max_credits: number | null
          name: string
          registration_end: string | null
          registration_start: string | null
          start_date: string
          type: Database["public"]["Enums"]["semester_type"]
          year: number
        }
        Insert: {
          code: string
          created_at?: string | null
          end_date: string
          id?: string
          is_current?: boolean | null
          max_credits?: number | null
          name: string
          registration_end?: string | null
          registration_start?: string | null
          start_date: string
          type: Database["public"]["Enums"]["semester_type"]
          year: number
        }
        Update: {
          code?: string
          created_at?: string | null
          end_date?: string
          id?: string
          is_current?: boolean | null
          max_credits?: number | null
          name?: string
          registration_end?: string | null
          registration_start?: string | null
          start_date?: string
          type?: Database["public"]["Enums"]["semester_type"]
          year?: number
        }
        Relationships: []
      }
      course_prerequisites: {
        Row: {
          course_id: string
          created_at: string | null
          id: string
          is_corequisite: boolean | null
          prerequisite_id: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          id?: string
          is_corequisite?: boolean | null
          prerequisite_id: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          id?: string
          is_corequisite?: boolean | null
          prerequisite_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_prerequisites_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_prerequisites_prerequisite_id_fkey"
            columns: ["prerequisite_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_registrations: {
        Row: {
          grade: string | null
          id: string
          registered_at: string | null
          section_id: string
          status: string | null
          student_id: string
        }
        Insert: {
          grade?: string | null
          id?: string
          registered_at?: string | null
          section_id: string
          status?: string | null
          student_id: string
        }
        Update: {
          grade?: string | null
          id?: string
          registered_at?: string | null
          section_id?: string
          status?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_registrations_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "course_sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_registrations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      course_sections: {
        Row: {
          course_id: string
          created_at: string | null
          enrolled_count: number | null
          id: string
          max_students: number | null
          roll_number_end: number | null
          roll_number_start: number | null
          section_name: string
          semester_id: string
          teacher_id: string | null
        }
        Insert: {
          course_id: string
          created_at?: string | null
          enrolled_count?: number | null
          id?: string
          max_students?: number | null
          roll_number_end?: number | null
          roll_number_start?: number | null
          section_name: string
          semester_id: string
          teacher_id?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string | null
          enrolled_count?: number | null
          id?: string
          max_students?: number | null
          roll_number_end?: number | null
          roll_number_start?: number | null
          section_name?: string
          semester_id?: string
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_sections_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_sections_semester_id_fkey"
            columns: ["semester_id"]
            isOneToOne: false
            referencedRelation: "academic_semesters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_sections_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          code: string
          created_at: string | null
          credit_hours: number
          department_id: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_lab_only: boolean | null
          lab_hours: number | null
          name: string
          semester_offered: number | null
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          credit_hours: number
          department_id?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_lab_only?: boolean | null
          lab_hours?: number | null
          name: string
          semester_offered?: number | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          credit_hours?: number
          department_id?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_lab_only?: boolean | null
          lab_hours?: number | null
          name?: string
          semester_offered?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          code: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          established_year: number | null
          faculty: string | null
          head_of_department: string | null
          id: string
          is_active: boolean | null
          name: string
          office_location: string | null
          updated_at: string | null
        }
        Insert: {
          code: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          established_year?: number | null
          faculty?: string | null
          head_of_department?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          office_location?: string | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          established_year?: number | null
          faculty?: string | null
          head_of_department?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          office_location?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      faculty_meetings: {
        Row: {
          created_at: string | null
          day_of_week: Database["public"]["Enums"]["day_of_week"]
          department_id: string | null
          end_time: string
          id: string
          is_recurring: boolean | null
          room_id: string | null
          start_time: string
          title: string
        }
        Insert: {
          created_at?: string | null
          day_of_week: Database["public"]["Enums"]["day_of_week"]
          department_id?: string | null
          end_time: string
          id?: string
          is_recurring?: boolean | null
          room_id?: string | null
          start_time: string
          title: string
        }
        Update: {
          created_at?: string | null
          day_of_week?: Database["public"]["Enums"]["day_of_week"]
          department_id?: string | null
          end_time?: string
          id?: string
          is_recurring?: boolean | null
          room_id?: string | null
          start_time?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "faculty_meetings_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "faculty_meetings_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      makeup_classes: {
        Row: {
          created_at: string | null
          id: string
          makeup_date: string | null
          makeup_end_time: string | null
          makeup_room_id: string | null
          makeup_start_time: string | null
          original_date: string
          original_entry_id: string
          reason: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          makeup_date?: string | null
          makeup_end_time?: string | null
          makeup_room_id?: string | null
          makeup_start_time?: string | null
          original_date: string
          original_entry_id: string
          reason?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          makeup_date?: string | null
          makeup_end_time?: string | null
          makeup_room_id?: string | null
          makeup_start_time?: string | null
          original_date?: string
          original_entry_id?: string
          reason?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "makeup_classes_makeup_room_id_fkey"
            columns: ["makeup_room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "makeup_classes_original_entry_id_fkey"
            columns: ["original_entry_id"]
            isOneToOne: false
            referencedRelation: "timetable_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          department_id: string | null
          id: string
          is_read: boolean | null
          message: string
          target_id: string | null
          target_type: string | null
          title: string
          type: string | null
        }
        Insert: {
          created_at?: string | null
          department_id?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          target_id?: string | null
          target_type?: string | null
          title: string
          type?: string | null
        }
        Update: {
          created_at?: string | null
          department_id?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          target_id?: string | null
          target_type?: string | null
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          building: string
          capacity: number
          created_at: string | null
          department_id: string | null
          floor: number | null
          has_ac: boolean | null
          has_computer_lab: boolean | null
          has_projector: boolean | null
          has_whiteboard: boolean | null
          id: string
          is_available: boolean | null
          room_number: string
          room_type: Database["public"]["Enums"]["room_type"]
          updated_at: string | null
        }
        Insert: {
          building: string
          capacity: number
          created_at?: string | null
          department_id?: string | null
          floor?: number | null
          has_ac?: boolean | null
          has_computer_lab?: boolean | null
          has_projector?: boolean | null
          has_whiteboard?: boolean | null
          id?: string
          is_available?: boolean | null
          room_number: string
          room_type: Database["public"]["Enums"]["room_type"]
          updated_at?: string | null
        }
        Update: {
          building?: string
          capacity?: number
          created_at?: string | null
          department_id?: string | null
          floor?: number | null
          has_ac?: boolean | null
          has_computer_lab?: boolean | null
          has_projector?: boolean | null
          has_whiteboard?: boolean | null
          id?: string
          is_available?: boolean | null
          room_number?: string
          room_type?: Database["public"]["Enums"]["room_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rooms_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          academic_status: Database["public"]["Enums"]["academic_status"] | null
          cgpa: number | null
          created_at: string | null
          current_semester: number | null
          department_id: string | null
          email: string
          enrollment_date: string | null
          first_name: string
          id: string
          is_active: boolean | null
          last_name: string
          phone: string | null
          roll_number: string
          total_credits_completed: number | null
          updated_at: string | null
        }
        Insert: {
          academic_status?:
            | Database["public"]["Enums"]["academic_status"]
            | null
          cgpa?: number | null
          created_at?: string | null
          current_semester?: number | null
          department_id?: string | null
          email: string
          enrollment_date?: string | null
          first_name: string
          id?: string
          is_active?: boolean | null
          last_name: string
          phone?: string | null
          roll_number: string
          total_credits_completed?: number | null
          updated_at?: string | null
        }
        Update: {
          academic_status?:
            | Database["public"]["Enums"]["academic_status"]
            | null
          cgpa?: number | null
          created_at?: string | null
          current_semester?: number | null
          department_id?: string | null
          email?: string
          enrollment_date?: string | null
          first_name?: string
          id?: string
          is_active?: boolean | null
          last_name?: string
          phone?: string | null
          roll_number?: string
          total_credits_completed?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_availability: {
        Row: {
          created_at: string | null
          day_of_week: Database["public"]["Enums"]["day_of_week"]
          end_time: string
          id: string
          is_available: boolean | null
          start_time: string
          teacher_id: string
        }
        Insert: {
          created_at?: string | null
          day_of_week: Database["public"]["Enums"]["day_of_week"]
          end_time: string
          id?: string
          is_available?: boolean | null
          start_time: string
          teacher_id: string
        }
        Update: {
          created_at?: string | null
          day_of_week?: Database["public"]["Enums"]["day_of_week"]
          end_time?: string
          id?: string
          is_available?: boolean | null
          start_time?: string
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_availability_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          created_at: string | null
          department_id: string | null
          designation: string | null
          email: string
          employee_id: string
          first_name: string
          id: string
          is_active: boolean | null
          joining_date: string | null
          last_name: string
          max_hours_per_week: number | null
          phone: string | null
          specialization: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department_id?: string | null
          designation?: string | null
          email: string
          employee_id: string
          first_name: string
          id?: string
          is_active?: boolean | null
          joining_date?: string | null
          last_name: string
          max_hours_per_week?: number | null
          phone?: string | null
          specialization?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department_id?: string | null
          designation?: string | null
          email?: string
          employee_id?: string
          first_name?: string
          id?: string
          is_active?: boolean | null
          joining_date?: string | null
          last_name?: string
          max_hours_per_week?: number | null
          phone?: string | null
          specialization?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teachers_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      timetable_entries: {
        Row: {
          created_at: string | null
          day_of_week: Database["public"]["Enums"]["day_of_week"]
          end_time: string
          id: string
          is_lab_session: boolean | null
          room_id: string | null
          section_id: string
          start_time: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week: Database["public"]["Enums"]["day_of_week"]
          end_time: string
          id?: string
          is_lab_session?: boolean | null
          room_id?: string | null
          section_id: string
          start_time: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: Database["public"]["Enums"]["day_of_week"]
          end_time?: string
          id?: string
          is_lab_session?: boolean | null
          room_id?: string | null
          section_id?: string
          start_time?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "timetable_entries_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timetable_entries_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "course_sections"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      academic_status:
        | "regular"
        | "probation"
        | "warning"
        | "graduating"
        | "extended"
      day_of_week:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
      room_type:
        | "classroom"
        | "lab"
        | "lecture_hall"
        | "auditorium"
        | "conference"
      semester_type: "fall" | "spring" | "summer"
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
    Enums: {
      academic_status: [
        "regular",
        "probation",
        "warning",
        "graduating",
        "extended",
      ],
      day_of_week: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ],
      room_type: [
        "classroom",
        "lab",
        "lecture_hall",
        "auditorium",
        "conference",
      ],
      semester_type: ["fall", "spring", "summer"],
    },
  },
} as const
