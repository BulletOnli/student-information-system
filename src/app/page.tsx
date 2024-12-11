import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import { getAllCourses } from "@/data-access/course";
import { Announcements } from "@/components/Dashboard/Announcements";
import { CourseCard } from "@/components/Dashboard/CourseCard";
import { TodoList } from "@/components/TodoList";
import { QuickLinks } from "@/components/Dashboard/QuickLinks";
import Link from "next/link";
import UserDetails from "@/components/UserDetails";
import { CreateAnnouncementModal } from "./announcement/_components/CreateAnnouncementModal";
import { Megaphone, Paperclip } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OfficeHours from "@/components/OfficeHours";

const Homepage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const courses = await getAllCourses();
  const { email, firstName, lastName, role, id } = session.user;

  return (
    <div className="mx-auto bg-background p-6 space-y-6">
      {role === UserRole.STUDENT && <Announcements />}

      <div className="flex min-h-[calc(100vh-65px)] container mx-auto gap-6">
        {/* Main Content */}
        <main className="flex-1 space-y-8">
          {/* Greeting */}
          <div className="w-full flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col justify-center py-4 px-6 rounded-lg">
              <h1 className="text-4xl font-extrabold tracking-tight text-commonGreen">
                Welcome back, {role}!
              </h1>
              <p className="text-muted-foreground">
                Here&apos;s what&apos;s happening with your account today.
              </p>
            </div>

            <div className="w-fit h-full flex items-center gap-4">
              <CreateAnnouncementModal>
                <div className="w-36 h-[6.7rem] flex flex-col items-center justify-center gap-2 p-4 bg-white shadow-custom1 rounded-lg hover:bg-black/5 cursor-pointer">
                  <Megaphone className="size-8" color="#166534" />
                  <p className="text-sm text-center">
                    Make an <br />
                    Announcement
                  </p>
                </div>
              </CreateAnnouncementModal>
            </div>
          </div>

          {/* Course Cards Grid */}
          {role !== UserRole.STUDENT && (
            <div>
              <div className="flex items-center gap-4 justify-between">
                <h2 className="mb-4 text-xl font-semibold text-commonGreen">
                  Courses
                </h2>
                {courses?.length > 0 && (
                  <Link href="/courses" className="text-sm">
                    View all
                  </Link>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3">
                {courses.length === 0 && (
                  <p className="text-sm">No courses yet.</p>
                )}

                {courses?.slice(0, 3).map((course) => (
                  <CourseCard key={course.title} {...course} />
                ))}
              </div>
            </div>
          )}

          {role === UserRole.STUDENT && <UserDetails userId={id ?? ""} />}
        </main>

        {/* Right Sidebar */}
        <aside className="hidden w-80 border-l p-6 lg:block">
          <div className="space-y-6">
            <OfficeHours />

            <QuickLinks />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Homepage;
