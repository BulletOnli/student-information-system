import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

const announcements = [
  {
    id: "1",
    title: "Campus Closure Notice",
    content: "Campus will be closed on Monday due to scheduled maintenance.",
    date: "2024-01-20",
  },
  {
    id: "2",
    title: "New Library Resources",
    content:
      "Access to new digital resources is now available for all students.",
    date: "2024-01-19",
  },
];

export function Announcements() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-2">
        <Bell className="h-5 w-5" />
        <CardTitle>Important Announcements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="space-y-2">
              <h3 className="font-medium">{announcement.title}</h3>
              <p className="text-sm text-muted-foreground">
                {announcement.content}
              </p>
              <p className="text-xs text-muted-foreground">
                Posted on: {announcement.date}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
