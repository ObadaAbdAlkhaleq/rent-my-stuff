'use client';

import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  icon: IconType;
  selected: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ label, icon: Icon, selected, onClick }) => {
  return (
    <div
      className={ `
        flex border-2 rounded-xl p-3 gap-2 hover:border-black cursor-pointer transition
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
      onClick={() => onClick(label)}
    >
      <Icon size={ 25 } />
      <div className="font-semibold">{ label }</div>
    </div>
  );
};

export default CategoryInput;