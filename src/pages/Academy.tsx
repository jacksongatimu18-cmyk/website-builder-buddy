import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { User, Session } from "@supabase/supabase-js";
import spacLogo from "@/assets/spac-logo.jpg";
import { LogOut, BookOpen, Users, Award, Calendar } from "lucide-react";
import { useCourses } from "@/hooks/useCourses";
import { useUserLessonProgress, useUserCertificates } from "@/hooks/useProgress";
import { CourseCard } from "@/components/academy/CourseCard";

const Academy = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { data: courses, isLoading: coursesLoading } = useCourses();
  const { data: progress } = useUserLessonProgress(user?.id);
  const { data: certificates } = useUserCertificates(user?.id);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Student";

  // Calculate course progress for each course
  const getCourseProgress = (courseId: string) => {
    // This would need lesson counts per course - simplified for now
    const courseProgress = progress?.filter((p) => p.status === "completed") || [];
    // Return 0 for now - will be calculated properly when viewing course
    return undefined;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <img src={spacLogo} alt="SPAC Network" className="h-10 w-auto" />
              </Link>
              <span className="text-xl font-bold text-primary">Academy</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground hidden sm:block">
                Welcome, <span className="text-foreground font-medium">{userName}</span>
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to SPAC Academy, {userName}!
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Your journey to becoming a climate action leader starts here. Explore courses, connect with peers, and make an impact.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: BookOpen, label: "Courses Available", value: courses?.length?.toString() || "0" },
            { icon: Users, label: "Lessons Completed", value: progress?.filter((p) => p.status === "completed").length?.toString() || "0" },
            { icon: Award, label: "Certificates Earned", value: certificates?.length?.toString() || "0" },
            { icon: Calendar, label: "In Progress", value: progress?.filter((p) => p.status === "in_progress").length?.toString() || "0" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <stat.icon className="h-8 w-8 text-primary mb-3" />
              <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Courses */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Available Courses</h2>
          {coursesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border border-border rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  progress={getCourseProgress(course.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No courses available yet. Check back soon!</p>
            </div>
          )}
        </section>

        {/* Coming Soon */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">More Coming Soon!</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            We're continuously adding new courses, resources, and community features. Stay tuned for mentorship programs, live workshops, and certification tracks.
          </p>
          <Button>Get Notified</Button>
        </section>
      </main>
    </div>
  );
};

export default Academy;
