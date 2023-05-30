'use Client';

import Image from "next/image";

const HeroImage = () => {
  return (
    <div className="relative aspect-square">
      <Image
        fill
        src={ "/images/blob.png" }
        className="object-contain h-1/2"
        alt="bg-shape"
      />
      <Image
        fill
        src={ "/images/hero.png" }
        alt="car-img"
        className="object-contain h-1/2"
      />
    </div>
  );
};

export default HeroImage;