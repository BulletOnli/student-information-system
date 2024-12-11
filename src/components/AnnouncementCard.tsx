import React from "react";

interface AnnouncementCardProps {
  title: string;
  content: string;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  title,
  content,
}) => {
  return (
    <section className="w-full bg-green-gradient rounded-lg py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-yellow-300 mb-3">
          {title}
        </h2>
        <p className="text-white text-xl md:text-xl font-semibold tracking-wide">
          {content}
        </p>
      </div>
    </section>
  );
};

export default AnnouncementCard;
