import { getCourseSubjects } from "@/data-access/subject";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { courseId }: { courseId: string }) {
  const courseSubjects = await getCourseSubjects(courseId);

  return Response.json(courseSubjects, { status: 200 });
}
