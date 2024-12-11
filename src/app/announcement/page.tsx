import { Suspense } from "react";
import { getAllAnnouncements } from "@/data-access/announcement";
import { CreateAnnouncementModal } from "./_components/CreateAnnouncementModal";
import { formatDate } from "@/utils/formatDate";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays } from "lucide-react";

async function AnnouncementsList() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const announcements = await getAllAnnouncements();

  return (
    <div className="space-y-4 mt-4">
      {announcements.length === 0 ? (
        <p>No announcements yet.</p>
      ) : (
        announcements.map((announcement) => (
          <Card
            key={announcement.id}
            className="w-full max-w-2xl mx-auto border-commonGreen/30"
          >
            <CardHeader className="py-4 pb-2">
              <CardTitle className="text-xl font-bold text-commonGreen">
                {announcement?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                {announcement?.content}
              </p>

              <div className="flex items-center space-x-4 pt-4 border-t">
                <Avatar className="h-8 w-8">
                  <AvatarImage alt={announcement?.author?.firstName} />
                  <AvatarFallback className="bg-green-gradient text-white">
                    {announcement?.author?.firstName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {announcement?.author?.firstName}{" "}
                    {announcement?.author?.lastName}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <CalendarDays className="mr-1 h-3 w-3" />
                    {formatDate(announcement.createdAt)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default function AnnouncementsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-commonGreen">Announcements</h1>
        <CreateAnnouncementModal>
          <Button>Create Announcement</Button>
        </CreateAnnouncementModal>
      </div>

      <AnnouncementsList />
    </div>
  );
}
