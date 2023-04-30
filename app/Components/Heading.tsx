'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="text-xl font-bold">
        {title}
        <div className="font-light mt-2 text-neutral-500 text-base">
          {subtitle}
        </div>
      </div>
    </div>
  );
}

export default Heading;