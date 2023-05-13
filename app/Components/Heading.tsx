'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  big?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center, big }) => {
  return (
    <div className={ center ? 'text-center' : 'text-start' }>
      <div className={ `${big ? 'text-3xl font-semibold' : 'text-xl font-bold'}` }>
        { title }
        <div className={ `font-light text-neutral-500 ${big ? 'text-sm underline' : 'mt-2 text-base'}` }>
          { subtitle }
        </div>
      </div>
    </div>
  );
};

export default Heading;