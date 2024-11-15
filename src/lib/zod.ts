import { COURSES } from "@/constants";
import z from "zod";

//* USERS

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

// Base user schema
export const baseUserSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  role: z
    .enum(["ADMIN", "FACULTY", "STUDENT"], {
      required_error: "Please select a role",
    })
    .default("ADMIN"),
});

// Faculty schema
export const facultySchema = baseUserSchema.extend({
  role: z.literal("FACULTY"),
  facultyNumber: z.string().min(1, { message: "Faculty number is required." }),
  department: z.string().min(1, { message: "Department is required." }),
  position: z.string().min(1, { message: "Position is required." }),
});

// Student schema
export const studentSchema = baseUserSchema.extend({
  role: z.literal("STUDENT"),
  studentNumber: z.string().min(1, { message: "Student number is required." }),
  courseId: z.string().min(1, { message: "Course is required." }),
  section: z.string().min(1, { message: "Section is required." }),
  yearLevel: z.string().min(1, { message: "Year level is required." }),
});

export const adminSchema = baseUserSchema.extend({
  role: z.literal("ADMIN"),
});

// Combined schema
export const userSchema = z.discriminatedUnion("role", [
  facultySchema,
  studentSchema,
  adminSchema,
]);

export type User = z.infer<typeof userSchema>;

//* COURSES

export const courseSchema = z.object({
  title: z.string(),
  description: z.string(),
  code: z.string(),
});

export type Course = z.infer<typeof courseSchema>;
