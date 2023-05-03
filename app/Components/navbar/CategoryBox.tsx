'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import querystring from "query-string";


interface CategoryBoxProps{
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({label, icon: Icon, selected,}) => {
  
  const router = useRouter();
  const params = useSearchParams();
  const handleClick = useCallback(() => {
    // define an empty query
    let currentQuery = {};

    // check for parameters if params exist convert them to objs.. theyre by default strings 
    if (params) {
      currentQuery = querystring.parse(params.toString());
    }

    // spread the query and add category to the query
    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    // generate the url with querystring.stringifyUrl()
    const url = querystring.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true })

    router.push(url);
  }, [label, params, router]);


  return (
    <div 
      onClick={handleClick}
      className={` 
      flex flex-col items-center justify-center gap-2 py-1 border-b-2 hover:text-neutral-800 transition cursor-pointer
      ${selected ? 'border-b-neutral-800' : 'border-transparent'}
      ${selected ? 'text-neutral-800' : 'text-neutral-500'}

      `}>
      <Icon size="24" />
      <div 
        className="font-medium text-sm"
        >
        {label}
      </div>
    </div>
  );
}

export default CategoryBox;