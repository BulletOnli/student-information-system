import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type GradeData = {
  PRELIMS: number | null;
  MIDTERMS: number | null;
  FINALS: number | null;
};

type SubjectData = {
  id: string;
  code: string;
  title: string;
  grades: {
    FIRST: GradeData;
    SECOND: GradeData;
  };
};

type GradesTableProps = {
  subjects: SubjectData[];
};

export default function GradesTable({ subjects }: GradesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead rowSpan={2}>Subject Code</TableHead>
          <TableHead rowSpan={2}>Subject Title</TableHead>
          <TableHead colSpan={3}>First Semester</TableHead>
          <TableHead colSpan={3}>Second Semester</TableHead>
        </TableRow>
        <TableRow>
          <TableHead>Prelims</TableHead>
          <TableHead>Midterms</TableHead>
          <TableHead>Finals</TableHead>
          <TableHead>Prelims</TableHead>
          <TableHead>Midterms</TableHead>
          <TableHead>Finals</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subjects.map((subject) => (
          <TableRow key={subject.id}>
            <TableCell>{subject.code}</TableCell>
            <TableCell>{subject.title}</TableCell>
            <TableCell>
              {subject.grades.FIRST.PRELIMS?.toFixed(2) || "-"}
            </TableCell>
            <TableCell>
              {subject.grades.FIRST.MIDTERMS?.toFixed(2) || "-"}
            </TableCell>
            <TableCell>
              {subject.grades.FIRST.FINALS?.toFixed(2) || "-"}
            </TableCell>
            <TableCell>
              {subject.grades.SECOND.PRELIMS?.toFixed(2) || "-"}
            </TableCell>
            <TableCell>
              {subject.grades.SECOND.MIDTERMS?.toFixed(2) || "-"}
            </TableCell>
            <TableCell>
              {subject.grades.SECOND.FINALS?.toFixed(2) || "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
