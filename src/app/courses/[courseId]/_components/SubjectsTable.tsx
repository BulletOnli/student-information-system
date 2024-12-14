import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight, Users } from "lucide-react";
import { getCourseSubjects } from "@/data-access/subject";
import ManageSubjectModal from "./ManageSubjectModal";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import Link from "next/link";

type Props = {
  courseId: string;
};

const SubjectsTable = async ({ courseId }: Props) => {
  const subjects = await getCourseSubjects(courseId);
  const session = await auth();
  const isAdmin = session?.user?.role === UserRole.ADMIN;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-green-gradient text-white ">
        <CardTitle className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Subjects
            <Badge variant="secondary" className="ml-2">
              {subjects.length}
            </Badge>
          </div>

          {isAdmin && <ManageSubjectModal courseId={courseId} />}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        {subjects?.length === 0 && (
          <p className="text-center my-2 text-sm">No subjects yet</p>
        )}

        {subjects?.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Subject Teacher</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map(({ subject }) => (
                <TableRow key={subject.id}>
                  <TableCell>{subject.code}</TableCell>
                  <TableCell>{subject.title}</TableCell>
                  <TableCell>{subject.description}</TableCell>
                  <TableCell>
                    {subject.faculty?.user.firstName}{" "}
                    {subject.faculty?.user.lastName}
                  </TableCell>
                  <TableCell className="flex items-center gap-1 justify-center">
                    {isAdmin && (
                      <ManageSubjectModal
                        courseId={courseId}
                        defaultValues={subject}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {subjects?.length !== 0 && (
          <Link
            href={`/courses/${courseId}/subjects`}
            className="flex items-center gap-1 w-fit mx-auto font-medium my-2 hover:scale-[1.02] ease-in"
          >
            <p className="text-center text-sm mx-auto">View Subjects page</p>
            <ChevronRight className="size-5" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default SubjectsTable;
