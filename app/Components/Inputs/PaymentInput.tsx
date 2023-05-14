'use client';

import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ label, icon: Icon, selected, onClick }) => {
  return (
    <div
      className={ `
      flex flex-row items-center p-4  rounded-xl  gap-6 w-[14rem] h-20
        ${selected ? 'border-2 border-black' : 'border border-[#DDDDDD]'}
      `}
      onClick={ () => onClick(label) }
    >
      <Icon size={ 30 } className="flex-start text-neutral-600 mr-1" />
      <div className="text-lg font-semibold">
        { label }
      </div>
    </div>
  );
};

export default CategoryInput;