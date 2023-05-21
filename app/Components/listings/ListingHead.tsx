'use client';
import Heading from "@/app/Components/Heading";
import useAreas from "@/app/hooks/useAreas";
import { SafeListing, SafeUser } from "@/app/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Modal from "../Modals/Modal";
import { IoMdApps, IoMdClose } from "react-icons/io";
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
  const [ threeImages, setThreeImages ] = useState(false);

  // console.log(imageSrc.length);
  if (imageSrc.length >= 3) {
    useEffect(() => {
      setThreeImages(true);
    }, []);
  }

  const handleClose = () => {
    setShowAllImages(false);
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  if (showAllImages) {
    return (
      <>
        <div className="h-screen w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black md:bg-neutral-800/70">
          <div className="flex flex-col gap-2 relative w-full md:w-4/6 lg:w-4/6 xl:w-3/5  mx-auto h-full md:h-auto lg:h-auto 2xl:w-[50%]">
            <div className="flex flex-col items-end inset-0 z-50 absolute bottom-2 left-2">
              <div className="p-2 rounded-full text-gray-600 hover:bg-slate-50 hover:shadow-sm justify-center">
                <button
                  className="p-1 border-0 hover:opacity-70 transition"
                  onClick={ handleClose }
                >
                  <IoMdClose size={ 24 } />
                </button>
              </div>
            </div>
            <Carousel
              responsive={ responsive }
              dotListClass="custom-dot-list-style"
              removeArrowOnDeviceType={ [ "tablet", "mobile" ] }
              showDots={ true }
            >
              { data?.imageSrc?.length > 0 && data.imageSrc.map((image: string) => (
                <div key={ image } className="aspect-square inset-0 relative overflow-hidden rounded-xl shadow-sm">
                  <Image
                    fill
                    className="object-contain w-full h-3/6"
                    src={ `${image}` }
                    alt=""
                  />
                </div>
              )) }
            </Carousel>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Heading
        title={ title }
        subtitle={ `${location?.region}, ${location?.label}` }
        big
        share
        save
        id={ data.id }
        currentUser={ currentUser }
      />
      { !threeImages &&
        <div
          className="w-full h-[60vh] overflow-hidden rounded-xl relative"
        >
          <Image
            alt="Image"
            src={ imageSrc[ 0 ] }
            fill
            className="object-cover w-full"
          />
          <div
            onClick={ () => setShowAllImages(true) }
            className="flex flex-row justify-center items-center gap-2 absolute bottom-2 right-2 py-2 px-4 bg-slate-50 rounded-lg border border-black shadow-sm cursor-pointer select-none font-semibold">
            <IoMdApps size={ 20 } />
            Show More Photos
          </div>
        </div>
      }
      { threeImages &&
        <div
          className="w-full h-[60vh] relative grid grid-cols-3 grid-rows-2 gap-2 rounded-3xl overflow-hidden"
        >
          <div className="relative col-span-2 row-span-2 p-2">
            { data.imageSrc?.[ 0 ] && (
              <div>
                <Image
                  onClick={ () => setShowAllImages(true) }
                  alt="Image"
                  src={ data.imageSrc[ 0 ] }
                  fill
                  className="aspect-square cursor-pointer object-cover w-full shadow-md"
                />
              </div>
            ) }
          </div>
          <div className="col-span-1 col-start-3 relative p-2">
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
          <div className="col-span-1 relative p-2">
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
          <div
            onClick={ () => setShowAllImages(true) }
            className="flex flex-row justify-center items-center gap-2 absolute bottom-2 right-2 py-2 px-4 bg-slate-50 rounded-lg border border-black shadow-sm cursor-pointer select-none font-semibold">
            <IoMdApps size={ 20 } />
            Show More Photos
          </div>
        </div>
      }
    </>
  );
};

export default ListingHead;;