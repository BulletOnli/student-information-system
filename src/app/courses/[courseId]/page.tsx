import NotFound from "@/app/not-found";
import { auth } from "@/auth";
import { getCourseDetails } from "@/data-access/course";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    courseId: string;
  };
};

const CourseInfoPage = async ({ params }: Props) => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const course = await getCourseDetails(params.courseId);
  if (!course) {
    return <NotFound />;
  }

  return (
    <div>
      <h1>Course Info</h1>
      <p>ID: {params.courseId}</p>
      <p>Title: {course.title}</p>
      <p>Code: {course.code}</p>
      <p>Description: {course.description}</p>

      <div className="mt-8">
        {course.students.length > 0 ? (
          <div>
            <h2>Students</h2>
            <ul>
              {course.students.map((student) => (
                <li key={student.id}>
                  {student.user.firstName} {student.user.lastName}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No students enrolled in this course.</p>
        )}
      </div>
    </div>
  );
};

export default CourseInfoPage;
