import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, FileText, Library } from "lucide-react";

const links = [
  {
    title: "Library Access",
    icon: Library,
    href: "#",
  },
  {
    title: "Assignments",
    icon: FileText,
    href: "#",
  },
  {
    title: "Schedule",
    icon: Calendar,
    href: "#",
  },
  {
    title: "Course Materials",
    icon: BookOpen,
    href: "#",
  },
];

export function QuickLinks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {links.map((link) => (
            <Button
              key={link.title}
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <a href={link.href}>
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
