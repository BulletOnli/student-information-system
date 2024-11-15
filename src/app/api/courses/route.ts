import { getAllCourses } from "@/data-access/course";

export async function GET(req: Request) {
  const courses = await getAllCourses();

  return Response.json(courses, { status: 200 });
}
