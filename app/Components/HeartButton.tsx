'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
  small?: boolean;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser, small }) => {

  const { hasFavorited, toggleFavorite } = useFavorite({ listingId, currentUser });

  if (small) {
    return (
      <div className="flex flex-row gap-2 hover:cursor-pointer p-1 hover:bg-neutral-200 transition rounded-full" onClick={ toggleFavorite }>
        <AiOutlineHeart
          size={ 20 }
          className="fill-white absolute -top-[2px] -right-[2px]"
        />
        <AiFillHeart
          size={ 16 }
          className={ hasFavorited ? "fill-rose-500" : 'fill-neutral-500/70' }
        />
        <div className="text-sm font-semibold underline">Save</div>
      </div>
    );
  }

  return (
    <div
      onClick={ toggleFavorite }
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={ 24 }
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={ 20 }
        className={ hasFavorited ? "fill-rose-500" : 'fill-neutral-500/70' }
      />
    </div>
  );
};

export default HeartButton;