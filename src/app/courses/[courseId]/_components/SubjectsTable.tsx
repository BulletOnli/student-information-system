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
import { Users } from "lucide-react";
import { getCourseSubjects } from "@/data-access/subject";
import ManageSubjectModal from "./ManageSubjectModal";

type Props = {
  courseId: string;
};

const SubjectsTable = async ({ courseId }: Props) => {
  const subjects = await getCourseSubjects(courseId);

  return (
    <Card>
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Subjects
            <Badge variant="secondary" className="ml-2">
              {subjects.length}
            </Badge>
          </div>

          <ManageSubjectModal courseId={courseId} />
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
                    <ManageSubjectModal
                      courseId={courseId}
                      defaultValues={subject}
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

export default SubjectsTable;
