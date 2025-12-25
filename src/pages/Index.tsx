import { Link } from "react-router-dom";
import { Calendar, GraduationCap, User, Clock, Users, BookOpen } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Smart University Scheduler
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Intelligent timetable management with automatic clash detection and constraint satisfaction
          </p>
        </section>

        {/* Feature Cards */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow animate-fade-in">
            <CardHeader>
              <Calendar className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Automatic Scheduling</CardTitle>
              <CardDescription>
                AI-powered timetable generation with hard constraint satisfaction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• No teacher overlaps</li>
                <li>• No room conflicts</li>
                <li>• Credit hour limits enforced</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <GraduationCap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Student Portal</CardTitle>
              <CardDescription>
                View personal timetables and course registrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/student">
                <Button variant="outline" className="w-full">
                  Access Portal
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <User className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Teacher Schedule</CardTitle>
              <CardDescription>
                View weekly teaching schedules and availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/teacher">
                <Button variant="outline" className="w-full">
                  View Schedule
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold">100%</div>
              <p className="text-sm text-muted-foreground">Clash-Free</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold">500+</div>
              <p className="text-sm text-muted-foreground">Students</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold">50+</div>
              <p className="text-sm text-muted-foreground">Courses</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <User className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold">30+</div>
              <p className="text-sm text-muted-foreground">Teachers</p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
