import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUsers } from "@/data-access/user";
import { UserRole } from "@prisma/client";
import ManageUserModal from "./ManageUserModal";
import DeleteUserModal from "./DeleteUserModal";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

type Props = {
  role?: UserRole;
};

const UsersTable = async ({ role }: Props) => {
  const users = await getAllUsers(role);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Existing Users</CardTitle>
        <CardDescription>A list of all users in the system.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>School ID</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              {role === UserRole.STUDENT && <StudentTableHeader />}
              {role === UserRole.FACULTY && <FacultyTableHeader />}
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.schoolId}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                {role === UserRole.STUDENT && (
                  <StudentTableRow student={user?.student} />
                )}
                {role === UserRole.FACULTY && (
                  <FacultyTableRow faculty={user?.faculty} />
                )}
                <TableCell className="flex items-center gap-1 justify-center">
                  <Link href={`/user/${user.id}`}>
                    <Button size="icon" variant="outline">
                      <Eye />
                    </Button>
                  </Link>
                  <ManageUserModal role={user.role} defaultValues={user} />
                  <DeleteUserModal userId={user.id} role={user.role} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users.length === 0 && (
          <p className="mt-4 text-center text-sm">No users found</p>
        )}
      </CardContent>
    </Card>
  );
};

export const StudentTableHeader = () => {
  return (
    <>
      <TableHead>Course</TableHead>
      <TableHead>Year Level</TableHead>
      <TableHead>Section</TableHead>
    </>
  );
};

export const StudentTableRow = ({ student }: { student: any }) => {
  return (
    <>
      <TableCell>{student.course.code}</TableCell>
      <TableCell>{student.yearLevel}</TableCell>
      <TableCell>{student.section}</TableCell>
    </>
  );
};

export const FacultyTableHeader = () => {
  return (
    <>
      <TableHead>Department</TableHead>
      <TableHead>Position</TableHead>
    </>
  );
};

export const FacultyTableRow = ({ faculty }: { faculty: any }) => {
  return (
    <>
      <TableCell>{faculty.department}</TableCell>
      <TableCell>{faculty.position}</TableCell>
    </>
  );
};

export default UsersTable;
