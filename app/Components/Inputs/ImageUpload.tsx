'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {

  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, [ onChange ]);

  return (
    <CldUploadWidget
      onUpload={ handleUpload }
      uploadPreset="yje9et6q"
      options={ { maxFiles: 1, sources: [ 'local' ] } }
    >
      { ({ open }) => {
        return (
          <div
            className="relative
            cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col items-center justify-center gap-4 text-neutral-600"
            onClick={ () => open?.() }
          >
            <TbPhotoPlus size={ 45 } />
            <div className="font-semibold text-lg">Click to Upload</div>
            { value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Upload"
                  fill
                  style={ { objectFit: 'contain' } }
                  src={ value }
                />
              </div>
            )

            }
          </div>
        );
      } }
    </CldUploadWidget>
  );
};
// TODO: add more image uploads and onclick to make image show like a modal
export default ImageUpload;