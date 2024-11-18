import { getAllCourses } from "@/data-access/course";
import React from "react";
import ManageCourseModal from "./_components/ManageCourseModal";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const CoursesPage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const courses = await getAllCourses();

  return (
    <div className="p-10">
      <div className="flex items-center gap-8">
        <h1>Courses</h1>
        <ManageCourseModal />
      </div>
      <ul>
        {courses.map((course) => (
          <Link key={course.id} href={`/courses/${course.id}`}>
            <li>{course.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CoursesPage;