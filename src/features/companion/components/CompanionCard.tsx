"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Clock,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Share
} from "lucide-react";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  bookmarked: boolean;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  bookmarked: initialBookmarked,
}: CompanionCardProps) => {
  const pathname = usePathname();
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const handleBookmark = async () => {
    if (isBookmarked) {
      // await removeBookmark(id, pathname);
      console.log("Removing bookmark for:", id);
    } else {
      // await addBookmark(id, pathname);
      console.log("Adding bookmark for:", id);
    }
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="custom-card">
      <div className="custom-card-header" style={{ backgroundColor: color }}>
        <div className="custom-badge custom-badge-light">{subject}</div>
        <div className="flex items-center gap-2">
          <div className="custom-badge">
            <Clock size={14} />
            <span>{duration} min</span>
          </div>
          <button
            className={`custom-icon-btn ${isBookmarked ? 'active' : ''}`}
            onClick={handleBookmark}
          >
            {isBookmarked ? (
              <BookmarkCheck size={16} fill="currentColor" />
            ) : (
              <Bookmark size={16} />
            )}
          </button>
        </div>
      </div>

      <div className="custom-card-content">
        <h3 className="custom-card-title">{name}</h3>
        <p className="custom-card-description">{topic}</p>

        <div className="custom-progress-container">
          <div className="custom-progress-labels">
            <span>Progress</span>
            <span>65%</span>
          </div>
          <div className="custom-progress-bar">
            <div className="custom-progress-fill" style={{ width: '65%', backgroundColor: color }}></div>
          </div>
        </div>

        <div className="custom-card-actions">
          <Link href={`/companions/${id}`} className="w-full">
            <button className="custom-btn custom-btn-primary" style={{ backgroundColor: color }}>
              <span>Launch Lesson</span>
              <ArrowRight size={16} />
            </button>
          </Link>

          <button className="custom-btn custom-btn-icon">
            <Share size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanionCard;