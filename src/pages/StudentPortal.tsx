import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, BookOpen, Calendar, Clock, MapPin } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WeeklyTimetable } from "@/components/WeeklyTimetable";
import { supabase } from "@/integrations/supabase/client";

export default function StudentPortal() {
  const [searchRollNumber, setSearchRollNumber] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  // Fetch students for search
  const { data: students = [] } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("students")
        .select("id, roll_number, first_name, last_name, email, current_semester, departments(name)")
        .eq("is_active", true)
        .limit(100);
      if (error) throw error;
      return data;
    },
  });

  // Fetch student timetable
  const { data: timetableData, isLoading: isLoadingTimetable } = useQuery({
    queryKey: ["student-timetable", selectedStudentId],
    queryFn: async () => {
      if (!selectedStudentId) return [];
      
      // Get student's registrations
      const { data: registrations, error: regError } = await supabase
        .from("course_registrations")
        .select(`
          section_id,
          course_sections(
            id,
            section_name,
            courses(id, code, name),
            teachers(first_name, last_name)
          )
        `)
        .eq("student_id", selectedStudentId)
        .eq("status", "registered");
      
      if (regError) throw regError;
      
      // Get timetable entries for these sections
      const sectionIds = registrations?.map(r => r.section_id) || [];
      
      if (sectionIds.length === 0) return [];
      
      const { data: entries, error: entryError } = await supabase
        .from("timetable_entries")
        .select(`
          id,
          day_of_week,
          start_time,
          end_time,
          is_lab_session,
          rooms(room_number, building),
          course_sections(
            section_name,
            courses(code, name),
            teachers(first_name, last_name)
          )
        `)
        .in("section_id", sectionIds);
      
      if (entryError) throw entryError;
      
      return entries?.map(entry => ({
        id: entry.id,
        day: entry.day_of_week,
        startTime: entry.start_time,
        endTime: entry.end_time,
        courseName: entry.course_sections?.courses?.name || "",
        courseCode: entry.course_sections?.courses?.code || "",
        roomNumber: entry.rooms?.room_number || "TBD",
        building: entry.rooms?.building || "",
        isLab: entry.is_lab_session || false,
        teacherName: entry.course_sections?.teachers 
          ? `${entry.course_sections.teachers.first_name} ${entry.course_sections.teachers.last_name}`
          : undefined,
        sectionName: entry.course_sections?.section_name,
      })) || [];
    },
    enabled: !!selectedStudentId,
  });

  const filteredStudents = students.filter(
    (s) =>
      s.roll_number.toLowerCase().includes(searchRollNumber.toLowerCase()) ||
      `${s.first_name} ${s.last_name}`.toLowerCase().includes(searchRollNumber.toLowerCase())
  );

  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Student Portal</h1>
          <p className="text-muted-foreground">
            Search for your student profile and view your weekly timetable
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Search Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Find Student
                </CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  type="text"
                  placeholder="Search by roll number or name..."
                  value={searchRollNumber}
                  onChange={(e) => setSearchRollNumber(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground mb-4"
                />
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {filteredStudents.slice(0, 10).map((student) => (
                    <button
                      key={student.id}
                      onClick={() => setSelectedStudentId(student.id)}
                      className={`w-full text-left p-3 rounded-md border transition-colors ${
                        selectedStudentId === student.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="font-medium">{student.roll_number}</div>
                      <div className="text-sm opacity-80">
                        {student.first_name} {student.last_name}
                      </div>
                    </button>
                  ))}
                  {filteredStudents.length === 0 && searchRollNumber && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No students found
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timetable Panel */}
          <div className="lg:col-span-3">
            {selectedStudent ? (
              <>
                {/* Student Info Card */}
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">
                          {selectedStudent.first_name[0]}{selectedStudent.last_name[0]}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">
                          {selectedStudent.first_name} {selectedStudent.last_name}
                        </h2>
                        <p className="text-muted-foreground">{selectedStudent.roll_number}</p>
                        <p className="text-sm text-muted-foreground">
                          Semester {selectedStudent.current_semester} • {selectedStudent.email}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timetable */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Weekly Timetable
                    </CardTitle>
                    <CardDescription>
                      Your class schedule for the current semester
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingTimetable ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                      </div>
                    ) : timetableData && timetableData.length > 0 ? (
                      <WeeklyTimetable entries={timetableData} showTeacher />
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No classes scheduled yet</p>
                        <p className="text-sm">Check back once registration is complete</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[500px]">
                <CardContent className="text-center">
                  <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-xl font-semibold mb-2">Select a Student</h3>
                  <p className="text-muted-foreground">
                    Search and select a student from the left panel to view their timetable
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
