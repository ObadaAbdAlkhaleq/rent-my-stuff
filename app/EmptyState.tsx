'use client';

import { useRouter } from "next/navigation";
import Heading from "./Components/Heading";
import Button from "./Components/Button";

interface EmptyState {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyState> = ({ title = "No exact matches", subtitle = "Try changing to removing some of your search filters", showReset }) => {

  const router = useRouter();


  return (
    <div
      className="h-[60vh] flex flex-col gap-2 justify-center items-center"
    >
      <Heading
        id=""
        center
        title={ title }
        subtitle={ subtitle }
      />
      <div className="w-48 mt-4">
        { showReset && (
          <Button
            outline
            label="Remove filters!"
            onClick={ () => router.push('/') }
          />
        ) }
      </div>
    </div>
  );
};

export default EmptyState;