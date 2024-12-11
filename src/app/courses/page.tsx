import { getAllCourses } from "@/data-access/course";
import React from "react";
import ManageCourseModal from "./_components/ManageCourseModal";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import { CourseCard } from "@/components/Dashboard/CourseCard";

const CoursesPage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const courses = await getAllCourses();

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-commonGreen">Courses</h1>
        {session.user.role === UserRole.ADMIN && <ManageCourseModal />}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3">
        {courses.length === 0 && <p className="text-sm">No courses yet.</p>}

        {courses?.slice(0, 3).map((course) => (
          <CourseCard key={course.title} {...course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
