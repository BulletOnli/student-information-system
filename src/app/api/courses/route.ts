import { getAllCourses } from "@/data-access/course";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const courses = await getAllCourses();

  return Response.json(courses, { status: 200 });
}
