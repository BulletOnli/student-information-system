import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import DeleteCourseButton from "@/app/courses/_components/DeleteCourseButton";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  code: string;
}

export function CourseCard({ title, description, code, id }: CourseCardProps) {
  return (
    <Card className="relative hover:bg-muted/50 transition-colors">
      <DeleteCourseButton courseId={id} />

      <Link href={`/courses/${id}`}>
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
          <div className="size-11 aspect-square rounded-full bg-primary/10 flex items-center justify-center">
            <img src="/images/gjc-logo.png" alt="GJC Logo" />
          </div>
          <div>
            <CardTitle className="font-medium">
              {title} ({code})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Link>
    </Card>
  );
}
