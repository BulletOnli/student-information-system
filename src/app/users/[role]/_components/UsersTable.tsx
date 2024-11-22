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
import ClickableCell from "../../../../components/ClickableCell";

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
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              {role === UserRole.STUDENT && <StudentTableHeader />}
              {role === UserRole.FACULTY && <FacultyTableHeader />}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <ClickableCell
                  route={`/user/${user.id}`}
                  className="cursor-pointer"
                >
                  {user.firstName}
                </ClickableCell>
                <ClickableCell
                  route={`/user/${user.id}`}
                  className="cursor-pointer"
                >
                  {user.lastName}
                </ClickableCell>
                <ClickableCell
                  route={`/user/${user.id}`}
                  className="cursor-pointer"
                >
                  {user.email}
                </ClickableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                {role === UserRole.STUDENT && (
                  <StudentTableRow student={user?.student} />
                )}
                {role === UserRole.FACULTY && (
                  <FacultyTableRow faculty={user?.faculty} />
                )}
                <TableCell className="space-x-2">
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
      <TableHead>Student #</TableHead>
      <TableHead>Course</TableHead>
      <TableHead>Year Level</TableHead>
      <TableHead>Section</TableHead>
    </>
  );
};

export const StudentTableRow = ({ student }: { student: any }) => {
  return (
    <>
      <TableCell>{student.studentNumber.toString()}</TableCell>
      <TableCell>{student.course.code}</TableCell>
      <TableCell>{student.yearLevel}</TableCell>
      <TableCell>{student.section}</TableCell>
    </>
  );
};

export const FacultyTableHeader = () => {
  return (
    <>
      <TableHead>Faculty #</TableHead>
      <TableHead>Department</TableHead>
      <TableHead>Position</TableHead>
    </>
  );
};

export const FacultyTableRow = ({ faculty }: { faculty: any }) => {
  return (
    <>
      <TableCell>{faculty.facultyNumber.toString()}</TableCell>
      <TableCell>{faculty.department}</TableCell>
      <TableCell>{faculty.position}</TableCell>
    </>
  );
};

export default UsersTable;
