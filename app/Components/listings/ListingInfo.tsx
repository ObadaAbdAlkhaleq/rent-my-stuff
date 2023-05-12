'use client';

import Avatar from "@/app/Components/Avatar";
import useAreas from "@/app/hooks/useAreas";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import { SlSpeedometer } from "react-icons/sl";
import ListingInfoMini from "@/app/Components/listings/ListingInfoMini";

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

const ListingInfo: React.FC<ListingInfoProps> = ({
  user, description, category, usage, conditionsValue, locationValue
}) => {
  const { getByValue } = useAreas();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="text-xl flex font-semibold items-center gap-2">
          <div>Item is Listed by { user?.name }</div>
          <Avatar
            src={ user?.image }
          />
        </div>
        <div className="flex flex-row">
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
            icon={ category.icon }
            sublabel={ usage }
          />
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;