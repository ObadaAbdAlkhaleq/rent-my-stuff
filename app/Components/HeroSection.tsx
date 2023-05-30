'use client';

import { usePathname } from "next/navigation";
import { useState } from "react";
import HeroImage from "./HeroImage";

const HeroSection = () => {
  const [ goUp, setGoUp ] = useState(false);

  const scrollToListings = () => {
    window.scrollTo({ top: (685), behavior: "smooth" });
  };

  const pathName = usePathname();
  const isMainPage = pathName === '/';

  if (!isMainPage) {
    return null;
  } else {
    return (
      <div className="py-5">
        <div className="container flex flex-wrap items-center justify-center mx-auto mt-32 lg:px-12 lg:flex-row">
          <div className="mb-14 lg:mb-0 lg:w-1/2">
            <div className="max-w-xl text-[2.9rem] leading-none text-gray-900 font-extrabold font-sans text-center lg:text-5xl lg:text-left lg:leading-tight mb-5">Unlock. Share. Save. <br />Discover the power of Renting</div>
            <div className="max-w-xl text-center text-gray-500 lg:text-left lg:max-w-lg">
              Rent what you need, when you need it. Join RentMyStuff and discover a world of possibilities. Embrace convenience, affordability, and sustainability. Start sharing today and unlock endless opportunities.
            </div>
            <div className="flex justify-center mt-14 lg:justify-start">
              <button onClick={ scrollToListings } type="button" className="hidden lg:inline-block text-white bg-indigo-600 font-medium rounded-lg px-5 py-4 text-center hover:bg-indigo-500 hover:drop-shadow-md transition duration-300 easeinout">Check out Listings</button>
              <button type="button" className="ml-4 text-gray-900 bg-gray-200 font-medium rounded-lg px-5 py-4 text-center hover:bg-gray-300 hover:drop-shadow-md transition duration-300 easeinout">Learn More</button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <HeroImage />
          </div>
        </div>
      </div>
    );
  }
};

export default HeroSection;