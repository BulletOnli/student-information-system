import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CourseCardProps {
  title: string;
  description: string;
  code: string;
}

export function CourseCard({ title, description, code }: CourseCardProps) {
  return (
    <Card className="hover:bg-muted/50 transition-colors">
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
    </Card>
  );
}
