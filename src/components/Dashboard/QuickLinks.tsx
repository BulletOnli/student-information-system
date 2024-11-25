import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, FileText, Library } from "lucide-react";
import Link from "next/link";

const links = [
  {
    title: "Library Access",
    icon: Library,
    href: "https://www.facebook.com/gjccollegelibrary/",
  },
  {
    title: "Assignments",
    icon: FileText,
    href: "https://classroom.google.com/u/4/h",
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
              <Link target="_blank" href={link.href}>
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
