'use client';
import Heading from "@/app/Components/Heading";
import HeartButton from "@/app/Components/HeartButton";
import useAreas from "@/app/hooks/useAreas";
import { SafeUser } from "@/app/types";
import Image from "next/image";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({ title, imageSrc, locationValue, id, currentUser }) => {
  const { getByValue } = useAreas();
  const location = getByValue(locationValue);
  return (
    <>
      <Heading
        title={ title }
        subtitle={ `${location?.region}, ${location?.label}` }
        big
      />
      <div
        className="w-full h-[60vh] overflow-hidden rounded-xl relative"
      >
        <Image
          alt="Image"
          src={ imageSrc }
          fill
          className="object-cover w-full shadow-md"
        />
        <div className="absolute top-5 right-5">
          <HeartButton
            listingId={ id }
            currentUser={ currentUser }
          />
        </div>
      </div>
    </>
  );
};

export default ListingHead;