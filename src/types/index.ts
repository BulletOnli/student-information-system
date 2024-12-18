import { UserRole } from "@prisma/client";

export type BasicUserInfo = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Subject = {
  id: string;
  code: string;
  title: string;
  description: string;
  facultyId?: string;
  faculty?: {
    user: BasicUserInfo;
  } | null;
};

export type CourseSubject = {
  courseId: string;
  subjectId: string;
  subject: Subject;
};
