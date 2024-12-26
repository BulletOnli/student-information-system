import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    studentId: string;
  };
};

export async function GET(req: Request, { params }: Props) {
  const student = await prisma.student.findFirst({
    where: { id: params.studentId },
    include: {
      // subjects: { select: { id: true } },
      enrolledSubjects: { select: { subjectId: true } },
      user: {
        select: { id: true, firstName: true, lastName: true, email: true },
      },
    },
  });

  return Response.json(student, { status: 200 });
}
