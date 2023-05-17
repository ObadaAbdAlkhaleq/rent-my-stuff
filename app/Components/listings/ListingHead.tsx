'use client';
import Heading from "@/app/Components/Heading";
import HeartButton from "@/app/Components/HeartButton";
import useAreas from "@/app/hooks/useAreas";
import { SafeListing, SafeUser } from "@/app/types";
import Image from "next/image";
import { useState } from "react";
import Modal from "../Modals/Modal";

interface ListingHeadProps {
  data: SafeListing;
  title: string;
  imageSrc: string[];
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({ data, title, imageSrc, locationValue, id, currentUser }) => {
  // const listings = await getListings();
  const { getByValue } = useAreas();
  const location = getByValue(locationValue);
  const [ showAllImages, setShowAllImages ] = useState(false);
  // console.log(imageSrc[ 0 ]);

  // if (showAllImages) {
  //   return (
  //     <div className="absolute justify-center  items-center flex overflow-x-hidden overflow-y-auto  inset-0 z-10 outline-none focus:outline-none bg-neutral-800/70 text-black min-h-screen">
  //       <div className="md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full  p-8 gap-4 ranslate border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
  //         <div>
  //           <h2 className="text-3xl mr-48">Photos of { data.title }</h2>
  //           <button onClick={ () => setShowAllImages(false) } className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
  //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  //               <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  //             </svg>
  //             Close photos
  //           </button>
  //         </div>
  //         { data.imageSrc.map(image => (
  //           <div className="h-20 w-20">
  //             <Image
  //               fill
  //               src={ image }
  //               alt=""
  //               className="h-fit w-fit group-hover:scale-110 transition"
  //             />
  //           </div>
  //         ))
  //         }
  //       </div>
  //     </div>
  //   );
  // }
  console.log(showAllImages);
  if (showAllImages) {
    return (
      <div className="absolute bg-white h-screen w-full z-20">
        <div className="flex flex-col gap-2 w-full">
          { data?.imageSrc?.length > 0 && data.imageSrc.map((image: string) => (
            <div key={ image } className="aspect-square p-10 inset-0 relative overflow-hidden rounded-xl shadow-sm">
              <Image
                fill
                className="object-cover w-full h-full"
                src={ `${image}` }
                alt=""
              />
            </div>
          )) }
        </div>
      </div>

    );
  }

  return (
    <>
      <Heading
        title={ title }
        subtitle={ `${location?.region}, ${location?.label}` }
        big
        share
      />
      <div
        className="w-full h-[60vh] relative grid grid-cols-2 grid-rows-2 gap-2 rounded-3xl overflow-hidden"
      >
        <div className="relative row-span-2 p-2">
          { data.imageSrc?.[ 0 ] && (
            <div>
              <Image
                onClick={ () => setShowAllImages(true) }
                alt="Image"
                src={ data.imageSrc[ 0 ] }
                fill
                className="aspect-square cursor-pointer object-cover w-full shadow-md"
              />
              <div className="absolute top-5 right-5">
                <HeartButton
                  listingId={ id }
                  currentUser={ currentUser }
                />
              </div>
            </div>
          ) }
        </div>
        <div className="col-start-2 relative p-2">
          { data.imageSrc?.[ 1 ] && (
            <Image
              onClick={ () => setShowAllImages(true) }
              alt="Image"
              src={ data.imageSrc[ 1 ] }
              fill
              className="aspect-square cursor-pointer object-cover"
            />
          ) }
        </div>
        <div className="relative p-2">
          { data.imageSrc?.[ 2 ] && (
            <Image
              onClick={ () => setShowAllImages(true) }
              alt="Image"
              src={ data.imageSrc[ 2 ] }
              fill
              className="aspect-square cursor-pointer object-cover relative top-2"
            />
          ) }
        </div>
      </div>
    </>
  );
};

export default ListingHead;;