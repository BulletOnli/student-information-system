import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import { getAllCourses } from "@/data-access/course";
import { Announcements } from "@/components/Dashboard/Announcements";
import { CourseCard } from "@/components/Dashboard/CourseCard";
import { TodoList } from "@/components/TodoList";
import { QuickLinks } from "@/components/Dashboard/QuickLinks";

const Homepage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const courses = await getAllCourses();
  const { email, firstName, lastName, role } = session.user;

  return (
    <div className="mx-auto bg-background">
      <div className="flex min-h-[calc(100vh-65px)]">
        {/* Main Content */}
        <main className="flex-1 p-8 space-y-8">
          {/* Greeting */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {role}!
            </h1>
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s happening with your courses today.
            </p>
          </div>

          <Announcements />

          {/* Course Cards Grid */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Courses</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3">
              {courses.length === 0 && (
                <p className="text-sm">No courses yet.</p>
              )}

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

export default Homepage;
