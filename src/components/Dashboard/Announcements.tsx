import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllAnnouncements } from "@/data-access/announcement";
import { formatDate } from "@/utils/formatDate";
import { Bell } from "lucide-react";

export async function Announcements() {
  const announcements = await getAllAnnouncements();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-2">
        <Bell className="h-5 w-5" />
        <CardTitle>Important Announcements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.length === 0 && (
            <p className="text-sm text-center">No announcements yet.</p>
          )}

          {announcements.map((announcement) => (
            <div key={announcement.id} className="space-y-2">
              <h3 className="font-medium">{announcement.title}</h3>
              <p className="text-sm text-muted-foreground">
                {announcement.content}
              </p>
              <p className="text-xs text-muted-foreground">
                Posted on: {formatDate(announcement.createdAt)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
