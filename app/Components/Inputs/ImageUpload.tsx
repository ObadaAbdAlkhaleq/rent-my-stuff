'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const [ uploadingImages, setUploadingImages ] = useState<string[]>([]);

  const handleUpload = useCallback((results: any | any[]) => {
    const processedResults = Array.isArray(results) ? results : [ results ];
    const secureUrls = processedResults.map((result) => result.info.secure_url);
    onChange([ ...value, ...secureUrls ]); // Update this line
    setUploadingImages([]);
  }, [ onChange, value ]);

  const handleUploadWidgetOpen = useCallback(() => {
    setUploadingImages(value);
  }, [ value ]);

  return (
    <CldUploadWidget
      onUpload={ handleUpload }
      uploadPreset="yje9et6q"
      options={ { maxFiles: 5, sources: [ 'local' ] } } // Set the maximum number of files you want to allow
    >
      { ({ open }) => (
        <div
          className="relative 
          cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col items-center justify-center gap-4 text-neutral-600"
          onClick={ () => open?.() }
        >
          <TbPhotoPlus size={ 45 } />
          <div className="font-semibold text-lg">Click to Upload</div>
          { uploadingImages.length > 0 && (
            <div className="absolute inset-0 w-full h-full">
              { uploadingImages.map((imageUrl) => (
                <Image
                  key={ imageUrl }
                  alt="Upload"
                  fill
                  style={ { objectFit: 'contain' } }
                  src={ imageUrl }
                />
              )) }
            </div>
          ) }
        </div>
      ) }
    </CldUploadWidget>
  );
};

export default ImageUpload;