'use client';

import Container from "../Container";

import { GiSofa } from "react-icons/gi";
import { GrBike } from "react-icons/gr";
import { AiFillTool } from "react-icons/ai";
import { MdTableRestaurant } from "react-icons/md";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: 'Indoor Furniture',
    icon: GiSofa,
    description: 'Indoors Furniture'
  },
  {
    label: 'Sport Goods',
    icon: GrBike,
    description: 'Sport Equipment'
  },
  {
    label: 'Tools',
    icon: AiFillTool,
    description: 'Hand held tools'
  },
  {
    label: 'Event stuff',
    icon: MdTableRestaurant,
    description: 'Events supplies'
  },
];

const Categories = () => {

  const params = useSearchParams();
  const category = params?.get('category');
  const pathName = usePathname();
  const isMainPage = pathName === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        { categories.map(((item) => (
          <CategoryBox
            key={ item.label }
            label={ item.label }
            icon={ item.icon }
            selected={ category === item.label }
          />
        ))) }
      </div>
    </Container>
  );
};

export default Categories;