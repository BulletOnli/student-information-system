import { prisma } from "@/lib/prisma";
import { Course } from "@prisma/client";

type RegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "STUDENT" | "FACULTY" | "ADMIN";
};

export const createUser = async (data: RegisterUser) => {
  return await prisma.user.create({ data });
};

type StudentInfo = {
  userId: string;
  course: Course;
  section: string;
  yearLevel: number;
  studentNumber: number;
};

export const createStudent = async (data: StudentInfo) => {
  return await prisma.student.create({ data });
};

type FacultyInfo = {
  userId: string;
  department: string;
  position: string;
  facultyNumber: number;
};

export const createFaculty = async (data: FacultyInfo) => {
  return await prisma.faculty.create({ data });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};
