'use client';

import Container from "../Container";

import { GiCampingTent, GiDrill, GiGardeningShears, GiGrandPiano, GiOfficeChair, GiSofa } from "react-icons/gi";
import { GrBike } from "react-icons/gr";
import { AiFillHome, AiFillTool } from "react-icons/ai";
import { FaBabyCarriage, FaPaintBrush } from "react-icons/fa";
import { MdTableRestaurant } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { BiParty } from "react-icons/bi";
import { IoMdFitness } from "react-icons/io";

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
    label: 'Event Rentals',
    icon: MdTableRestaurant,
    description: 'Events supplies'
  },
  {
    label: 'Electric Tools',
    icon: GiDrill,
    description: 'Electric Tools'
  },
  {
    label: 'Fitness Equipment',
    icon: IoMdFitness,
    description: 'Fitness Equipment'
  },
  {
    label: 'Home Decor',
    icon: AiFillHome,
    description: 'Home Decor'
  },
  {
    label: 'Musical Instruments',
    icon: GiGrandPiano,
    description: 'Musical Instruments'
  },
  {
    label: 'Baby Equipment',
    icon: FaBabyCarriage,
    description: 'Events supplies'
  },
  {
    label: 'Outdoor Gear',
    icon: GiCampingTent,
    description: 'Outdoor Gear'
  },
  {
    label: 'Garden and Yard Equipment',
    icon: GiGardeningShears,
    description: 'Garden and Yard Equipment'
  },
  {
    label: 'Books and Media',
    icon: ImBooks,
    description: 'Events supplies'
  },
  {
    label: 'Art and Craft Supplies',
    icon: FaPaintBrush,
    description: 'Events supplies'
  },
  {
    label: 'Party Entertainment',
    icon: BiParty,
    description: 'Events supplies'
  },
  {
    label: 'Office Equipment',
    icon: GiOfficeChair,
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
      <div className="pt-4 flex flex-row items-center justify-around overflow-x-auto space-x-2">
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