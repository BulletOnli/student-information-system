import { Bell } from "lucide-react";
import { TodoList } from "../TodoList";
import { QuickLinks } from "../Dashboard/QuickLinks";
import { CourseCard } from "../Dashboard/CourseCard";
import { Announcements } from "../Dashboard/Announcements";

const courses = [
  {
    title: "Bachelor of Science in Information Technology",
    description: "Learn the basics of computer science and programming.",
  },
  {
    title: "Advanced Mathematics",
    description: "Explore advanced mathematical concepts and theories.",
  },
  {
    title: "History of Art",
    description: "Study the history and development of art through the ages.",
  },
  {
    title: "Physics for Engineers",
    description: "Understand the principles of physics applied in engineering.",
  },
  {
    title: "Creative Writing",
    description: "Develop your writing skills and explore creative expression.",
  },
];
const StudentDashboardLayout = () => {
  return (
    <div className="mx-auto bg-background">
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, Student!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your courses today.
            </p>
          </div>

          {/* Notifications */}
          <div className="mb-8 flex items-center space-x-2 rounded-lg border bg-card p-4">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              You have 3 upcoming assignments due this week
            </p>
          </div>

          {/* Announcements */}
          <div className="mb-8">
            <Announcements />
          </div>

          {/* Course Cards Grid */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Your Courses</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {courses.map((course) => (
                <CourseCard key={course.title} {...course} />
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden w-80 border-l p-8 lg:block">
          <div className="space-y-6">
            <TodoList />
            <QuickLinks />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
