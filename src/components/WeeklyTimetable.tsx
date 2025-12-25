import { cn } from "@/lib/utils";

interface TimetableEntry {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  courseName: string;
  courseCode: string;
  roomNumber: string;
  building: string;
  isLab: boolean;
  sectionName?: string;
  teacherName?: string;
}

interface WeeklyTimetableProps {
  entries: TimetableEntry[];
  showTeacher?: boolean;
  showSection?: boolean;
}

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export function WeeklyTimetable({ entries, showTeacher = false, showSection = false }: WeeklyTimetableProps) {
  const getEntryForSlot = (day: string, hour: string) => {
    return entries.find((entry) => {
      const entryStart = entry.startTime.substring(0, 5);
      const entryEnd = entry.endTime.substring(0, 5);
      return (
        entry.day.toLowerCase() === day &&
        hour >= entryStart &&
        hour < entryEnd
      );
    });
  };

  const isFirstSlotOfEntry = (day: string, hour: string, entry: TimetableEntry) => {
    return entry.startTime.substring(0, 5) === hour;
  };

  const getEntrySpan = (entry: TimetableEntry) => {
    const startHour = parseInt(entry.startTime.substring(0, 2));
    const endHour = parseInt(entry.endTime.substring(0, 2));
    return endHour - startHour;
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-[80px_repeat(6,1fr)] gap-1">
          {/* Header */}
          <div className="p-3 text-center font-semibold text-muted-foreground">Time</div>
          {DAYS.map((day) => (
            <div
              key={day}
              className="p-3 text-center font-semibold capitalize bg-muted rounded-t-lg"
            >
              {day}
            </div>
          ))}

          {/* Time slots */}
          {HOURS.map((hour) => (
            <>
              <div
                key={`time-${hour}`}
                className="p-3 text-center text-sm text-muted-foreground border-t"
              >
                {hour}
              </div>
              {DAYS.map((day) => {
                const entry = getEntryForSlot(day, hour);
                
                if (entry && !isFirstSlotOfEntry(day, hour, entry)) {
                  return null;
                }

                if (entry && isFirstSlotOfEntry(day, hour, entry)) {
                  const span = getEntrySpan(entry);
                  return (
                    <div
                      key={`${day}-${hour}`}
                      className={cn(
                        "p-2 rounded-md border-l-4 animate-fade-in",
                        entry.isLab
                          ? "bg-schedule-lab/20 border-l-schedule-lab"
                          : "bg-schedule-lecture/20 border-l-schedule-lecture"
                      )}
                      style={{ gridRow: `span ${span}` }}
                    >
                      <div className="text-sm font-semibold">{entry.courseCode}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {entry.courseName}
                      </div>
                      <div className="text-xs mt-1">
                        {entry.building} - {entry.roomNumber}
                      </div>
                      {entry.isLab && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-schedule-lab/30 rounded-full">
                          Lab
                        </span>
                      )}
                      {showTeacher && entry.teacherName && (
                        <div className="text-xs mt-1 text-muted-foreground">
                          {entry.teacherName}
                        </div>
                      )}
                      {showSection && entry.sectionName && (
                        <div className="text-xs text-muted-foreground">
                          Section {entry.sectionName}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div
                    key={`${day}-${hour}`}
                    className="p-2 border-t border-dashed border-border/50 min-h-[60px]"
                  />
                );
              })}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
