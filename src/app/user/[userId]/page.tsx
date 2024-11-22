import NotFound from "@/app/not-found";
import InputGradesModal from "@/components/InputGrades";
import { getStudentDetails } from "@/data-access/user";
import React from "react";

type Props = {
  params: {
    userId: string;
  };
};

const UserDetailsPage = async ({ params }: Props) => {
  const user = await getStudentDetails(params.userId);

  if (!user) {
    return <NotFound />;
  }

  return (
    <div>
      <InputGradesModal />

      <h1>User Details</h1>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>First Name:</strong> {user.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {user.lastName}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <h2 className="mt-4">Student Details</h2>
      <p>
        <strong>Student ID:</strong> {user?.student?.id}
      </p>
      <p>
        <strong>Student Number:</strong>{" "}
        {user?.student?.studentNumber.toString()}
      </p>
      <p>
        <strong>Course ID:</strong> {user?.student?.courseId}
      </p>
      <p>
        <strong>Year Level:</strong> {user?.student?.yearLevel}
      </p>
      <p>
        <strong>Section:</strong> {user?.student?.section}
      </p>

      <h3 className="mt-4">Course Details</h3>
      <p>
        <strong>Course ID:</strong> {user?.student?.course?.id}
      </p>
      <p>
        <strong>Course Code:</strong> {user?.student?.course?.code}
      </p>
      <p>
        <strong>Course Title:</strong> {user?.student?.course?.title}
      </p>
      <p>
        <strong>Course Description:</strong>{" "}
        {user?.student?.course?.description}
      </p>
    </div>
  );
};

export default UserDetailsPage;
