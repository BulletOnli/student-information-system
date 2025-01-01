import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    studentId: string;
  };
};

export async function GET(req: Request, { params }: Props) {
  const enrolledSubjects = await prisma.enrolledSubject.findMany({
    where: {
      studentId: params.studentId,
    },
    include: {
      subject: true,
    },
  });

  return Response.json(enrolledSubjects, { status: 200 });
}
