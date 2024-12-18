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
import { Eye, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ManageUserModal from "@/app/users/[role]/_components/ManageUserModal";
import { Student } from "@prisma/client";

type ExtendedStudent = Student & {
  user: {
    firstName: string;
    lastName: string;
    id: string;
    email: string;
    schoolId: string;
  };
};

type Props = {
  students: ExtendedStudent[];
  courseId: string;
};

const EnrolledStudentsTable = ({ students, courseId }: Props) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-green-gradient text-white ">
        <CardTitle className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Enrolled Students
            <Badge variant="secondary" className="ml-2">
              {students.length}
            </Badge>
          </div>

          <ManageUserModal role={"STUDENT"} courseId={courseId} />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        {students?.length === 0 && (
          <p className="text-center my-2 text-sm">No enrolled students yet</p>
        )}

        {students?.length >= 1 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[12rem]">School ID</TableHead>
                <TableHead>First name</TableHead>
                <TableHead>Last name</TableHead>
                <TableHead>Year Level</TableHead>
                <TableHead>Section</TableHead>
                <TableHead className="text-center lg:w-[12rem] ">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.user.schoolId}</TableCell>
                  <TableCell className="font-medium">
                    {student?.user?.firstName}
                  </TableCell>
                  <TableCell className="font-medium">
                    {student?.user?.lastName}
                  </TableCell>
                  <TableCell>{student?.yearLevel}</TableCell>
                  <TableCell>{student?.section}</TableCell>
                  <TableCell className="flex items-center gap-1 justify-center">
                    <Link href={`/user/${student?.user?.id}`}>
                      <Button size="icon">
                        <Eye />
                      </Button>
                    </Link>
                    <ManageUserModal
                      defaultValues={{
                        ...student,
                        ...student?.user,
                        yearLevel: student?.yearLevel?.toString(),
                        role: "STUDENT",
                      }}
                      role={"STUDENT"}
                      courseId={courseId}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default EnrolledStudentsTable;
