'use client';

import Avatar from "@/app/Components/Avatar";
import useAreas from "@/app/hooks/useAreas";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import { SlSpeedometer } from "react-icons/sl";
import ListingInfoMini from "@/app/Components/listings/ListingInfoMini";
import dynamic from "next/dynamic";
import { BsCashCoin, BsCreditCard } from "react-icons/bs";
import PaymentInput from "../Inputs/PaymentInput";

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  category: {
    icon: IconType;
    label: string;
    description: string;
  } | undefined;
  usage: string;
  conditionsValue: string;
  locationValue: string;
}

const Map = dynamic(() => import('../Map'), {
  ssr: false
});

const ListingInfo: React.FC<ListingInfoProps> = ({
  user, description, category, usage, conditionsValue, locationValue
}) => {
  const { getByValue } = useAreas();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-5 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="text-xl flex font-semibold items-center md:justify-between gap-2">
          <div>Item is Listed by { user?.name }</div>
          <Avatar
            // @ts-ignore
            imageSrc={ user?.image }
          />
        </div>
        <div className="">
          <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 mb-4">
            { category && (
              <ListingInfoMini
                icon={ category.icon }
                label={ category.label }
                sublabel={ category.description }
              />
            ) }
            <ListingInfoMini
              icon={ SlSpeedometer }
              label={ conditionsValue }
            />
            <ListingInfoMini
              // @ts-ignore
              icon={ category.icon }
              sublabel={ usage }
            />
          </div>
          <hr />
          {/* TODO: add payment functionallty  */ }
          <div className="flex flex-col gap-y-4 mt-4">
            <div className="items-start text-xl font-semibold">Accepted Payment method</div>
            <div className="flex flex-row justify-evenly">
              <PaymentInput
                icon={ BsCashCoin }
                label="Cash on Pickup"
                onClick={ () => { } }
                selected
              />
              <PaymentInput
                icon={ BsCreditCard }
                label="Payment via Card"
                onClick={ () => { } }

              />
            </div>
          </div>
        </div>
        <hr />
        <div className="">
          <div className="text-xl font-semibold mb-2">Where the item is located</div>
          <Map
            center={ coordinates }
          />
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;