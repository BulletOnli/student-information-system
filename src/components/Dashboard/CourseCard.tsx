import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CourseCardProps {
  title: string;
  description: string;
}

export function CourseCard({ title, description }: CourseCardProps) {
  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <div className="w-12 h-12 aspect-square rounded-full bg-primary/10 flex items-center justify-center">
          <img src="/images/gjc-logo.png" alt="GJC Logo" />
        </div>
        <div>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
