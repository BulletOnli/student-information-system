import { Suspense } from "react";
import { getAllAnnouncements } from "@/data-access/announcement";
import { CreateAnnouncementModal } from "./_components/CreateAnnouncementModal";
import { formatDate } from "@/utils/formatDate";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function AnnouncementsList() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const announcements = await getAllAnnouncements();

  return (
    <div className="space-y-4">
      {announcements.length === 0 ? (
        <p>No announcements yet.</p>
      ) : (
        announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="border rounded-lg p-4 space-y-1"
          >
            <h2 className="text-xl font-semibold">{announcement.title}</h2>
            <p>{announcement.content}</p>
            <p className="text-xs text-gray-500">
              {formatDate(announcement.createdAt)}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default function AnnouncementsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Announcements</h1>
        <CreateAnnouncementModal />
      </div>

      <AnnouncementsList />
    </div>
  );
}
