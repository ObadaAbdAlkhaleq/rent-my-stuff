'use client';

import { IconType } from "react-icons";

interface CategoryViewProps {
  icon: IconType,
  label?: string,
  sublabel?: string;
  sub?: boolean;
}

const CategoryView: React.FC<CategoryViewProps> = ({
  icon: Icon,
  label,
  sublabel,
  sub
}) => {
  return (
    <div className="">
      <div className="flex flex-row items-center p-4  rounded-xl border border-[#DDDDDD] gap-6 w-[14rem] h-20">
        <Icon size={ 30 } className="flex-start text-neutral-600 mr-1" />
        <div className={ ` text-ellipsis line-clamp-2 ${sub ? 'flex flex-col' : 'items-center justify-center'}` }>
          <div className="text-lg font-semibold">
            { label }
          </div>
          { sublabel && (
            <div
              className="text-neutral-500 font-light text-sm"
            >
              { sublabel }
            </div>
          ) }
        </div>
      </div>
    </div>
  );
};

export default CategoryView;