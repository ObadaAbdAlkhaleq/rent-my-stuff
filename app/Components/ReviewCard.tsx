'use client';

import { format } from "date-fns";
import Avatar from "./Avatar";
import { SafeUser } from "../types";

interface ReviewCardProps {
  user?: SafeUser | null;
  rating: number;
  comment: string;
  createdAt: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ rating, comment, createdAt, user }) => {

  const created = new Date(createdAt);
  const reviewDate = format(created, 'P');

  return (
    <div className="">
      <div className="flex w-full flex-col overflow-hidden rounded-lg bg-[#eff3f6] drop-shadow-xl">
        <div className="flex w-full items-center justify-between  border-b-2 border-slate-400/20 px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 items-center rounded-full">
              <Avatar
                imageSrc={ user?.image }
                height={ 32 }
                width={ 32 }
              />
            </div>
            <h2 className="text-lg font-semibold">{ user?.name }</h2>
          </div>

          <p>{ reviewDate }</p>
        </div>
        <div className="flex w-full flex-col items-start gap-4 p-8">
          <div className="flex items-center gap-4">
            <div className="w-28">
            </div>
          </div>
          <p>{ comment }</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;