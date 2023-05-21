'use client';

import HeartButton from "./HeartButton";
import ShareButton from "./ShareButton";
import { SafeListing, SafeUser } from "@/app/types";


interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  big?: boolean;
  share?: boolean;
  save?: boolean;
  id: string;
  currentUser?: SafeUser | null;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center, big, share, save, id, currentUser }) => {
  return (
    <div className={ center ? 'text-center' : 'text-start' }>
      <div className={ `${big ? 'text-3xl font-semibold' : 'text-xl font-bold'}` }>
        { title }
        <div className={ `text-neutral-500 flex flex-row items-center justify-between ${big ? 'text-sm underline font-semibold' : 'mt-2 text-base font-light'}` }>
          { subtitle }
          { share && save && (
            <div className="flex flex-row gap-2 text-center items-center">
              <HeartButton small listingId={ id } currentUser={ currentUser } />
              <ShareButton />
            </div>
          ) }
        </div>
      </div>
    </div>
  );
};

export default Heading;