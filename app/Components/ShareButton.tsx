'use client';

import { FiShare } from "react-icons/fi";
const ShareButton = () => {
  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL)
      .then(() => {
        console.log('URL copied successfully');
      })
      .catch((error) => {
        console.error('Failed to copy URL:', error);
      });
  };
  return (
    <div className="flex flex-row gap-2 hover:cursor-pointer p-1 hover:bg-neutral-200 transition rounded-full" onClick={ copyURL }>
      <FiShare size={ 16 } className="text-black" />
      <div className="text-sm font-semibold underline">Share</div>
    </div>
  );
};

export default ShareButton;