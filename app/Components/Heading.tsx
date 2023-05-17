'use client';

import ShareButton from "./ShareButton";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  big?: boolean;
  share?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center, big, share }) => {
  return (
    <div className={ center ? 'text-center' : 'text-start' }>
      <div className={ `${big ? 'text-3xl font-semibold' : 'text-xl font-bold'}` }>
        { title }
        <div className={ `text-neutral-500 flex flex-row items-center justify-between ${big ? 'text-sm underline font-semibold' : 'mt-2 text-base font-light'}` }>
          { subtitle }
          { share && (<div className="text-center items-center">
            <ShareButton />
          </div>) }
        </div>
      </div>
    </div>
  );
};

export default Heading;