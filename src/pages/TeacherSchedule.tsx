import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, User, Calendar, Clock, Building2 } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WeeklyTimetable } from "@/components/WeeklyTimetable";
import { supabase } from "@/integrations/supabase/client";

export default function TeacherSchedule() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);

  // Fetch teachers
  const { data: teachers = [] } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("teachers")
        .select("id, employee_id, first_name, last_name, email, designation, specialization, departments(name)")
        .eq("is_active", true)
        .limit(100);
      if (error) throw error;
      return data;
    },
  });

  // Fetch teacher's timetable
  const { data: timetableData, isLoading: isLoadingTimetable } = useQuery({
    queryKey: ["teacher-timetable", selectedTeacherId],
    queryFn: async () => {
      if (!selectedTeacherId) return [];
      
      // Get sections taught by this teacher
      const { data: sections, error: secError } = await supabase
        .from("course_sections")
        .select("id")
        .eq("teacher_id", selectedTeacherId);
      
      if (secError) throw secError;
      
      const sectionIds = sections?.map(s => s.id) || [];
      
      if (sectionIds.length === 0) return [];
      
      // Get timetable entries for these sections
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
            courses(code, name)
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
        sectionName: entry.course_sections?.section_name,
      })) || [];
    },
    enabled: !!selectedTeacherId,
  });

  // Fetch teacher availability
  const { data: availability = [] } = useQuery({
    queryKey: ["teacher-availability", selectedTeacherId],
    queryFn: async () => {
      if (!selectedTeacherId) return [];
      
      const { data, error } = await supabase
        .from("teacher_availability")
        .select("*")
        .eq("teacher_id", selectedTeacherId)
        .eq("is_available", true);
      
      if (error) throw error;
      return data;
    },
    enabled: !!selectedTeacherId,
  });

  const filteredTeachers = teachers.filter(
    (t) =>
      t.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${t.first_name} ${t.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.designation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedTeacher = teachers.find((t) => t.id === selectedTeacherId);

  // Calculate teaching hours
  const totalHours = timetableData?.reduce((acc, entry) => {
    const start = parseInt(entry.startTime.substring(0, 2));
    const end = parseInt(entry.endTime.substring(0, 2));
    return acc + (end - start);
  }, 0) || 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Teacher Schedule</h1>
          <p className="text-muted-foreground">
            View teacher profiles and their weekly teaching schedules
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Search Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Find Teacher
                </CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  type="text"
                  placeholder="Search by ID, name, or designation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground mb-4"
                />
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {filteredTeachers.slice(0, 10).map((teacher) => (
                    <button
                      key={teacher.id}
                      onClick={() => setSelectedTeacherId(teacher.id)}
                      className={`w-full text-left p-3 rounded-md border transition-colors ${
                        selectedTeacherId === teacher.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="font-medium">
                        {teacher.first_name} {teacher.last_name}
                      </div>
                      <div className="text-sm opacity-80">{teacher.designation}</div>
                      <div className="text-xs opacity-60">{teacher.employee_id}</div>
                    </button>
                  ))}
                  {filteredTeachers.length === 0 && searchTerm && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No teachers found
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Schedule Panel */}
          <div className="lg:col-span-3">
            {selectedTeacher ? (
              <>
                {/* Teacher Info Card */}
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">
                            {selectedTeacher.first_name[0]}{selectedTeacher.last_name[0]}
                          </span>
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">
                            {selectedTeacher.first_name} {selectedTeacher.last_name}
                          </h2>
                          <p className="text-muted-foreground">{selectedTeacher.designation}</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedTeacher.specialization} • {selectedTeacher.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="text-center px-4 py-2 bg-muted rounded-lg">
                          <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <div className="text-lg font-bold">{totalHours}</div>
                          <div className="text-xs text-muted-foreground">Hours/Week</div>
                        </div>
                        <div className="text-center px-4 py-2 bg-muted rounded-lg">
                          <Calendar className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <div className="text-lg font-bold">{timetableData?.length || 0}</div>
                          <div className="text-xs text-muted-foreground">Classes</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Availability Summary */}
                {availability.length > 0 && (
                  <Card className="mb-6">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Availability</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {availability.map((slot) => (
                          <span
                            key={slot.id}
                            className="px-3 py-1 bg-schedule-lab/20 text-sm rounded-full capitalize"
                          >
                            {slot.day_of_week}: {slot.start_time.substring(0, 5)} - {slot.end_time.substring(0, 5)}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Timetable */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Weekly Teaching Schedule
                    </CardTitle>
                    <CardDescription>
                      Classes and lab sessions for the current semester
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingTimetable ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                      </div>
                    ) : timetableData && timetableData.length > 0 ? (
                      <WeeklyTimetable entries={timetableData} showSection />
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No classes scheduled yet</p>
                        <p className="text-sm">Classes will appear here once the timetable is generated</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[500px]">
                <CardContent className="text-center">
                  <User className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-xl font-semibold mb-2">Select a Teacher</h3>
                  <p className="text-muted-foreground">
                    Search and select a teacher from the left panel to view their schedule
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
