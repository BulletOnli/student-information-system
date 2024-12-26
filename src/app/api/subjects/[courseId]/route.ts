import { getCourseSubjects } from "@/data-access/subject";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    courseId: string;
  };
};

export async function GET(req: Request, { params }: Props) {
  const courseSubjects = await getCourseSubjects(params.courseId);

  return Response.json(courseSubjects, { status: 200 });
}
