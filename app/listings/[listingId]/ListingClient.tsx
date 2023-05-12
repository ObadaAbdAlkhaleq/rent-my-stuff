'use client';

import { useMemo } from "react";
import { Reservation } from "@prisma/client";
import { SafeListing, SafeUser } from "@/app/types";
import { categories } from "@/app/Components/navbar/Categories";
import Container from "@/app/Components/Container";
import ListingHead from "../../Components/listings/ListingHead";
import ListingInfo from "@/app/Components/listings/ListingInfo";

interface ListingClientProps {
  reservations?: Reservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({ listing, currentUser }) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [ listing.category ]);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-1">
          <ListingHead
            title={ listing.title }
            imageSrc={ listing.imageSrc }
            locationValue={ listing.locationValue }
            id={ listing.id }
            currentUser={ currentUser }
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-4">
            <ListingInfo
              user={ listing.user }
              category={ category }
              description={ listing.description }
              usage={ listing.usage }
              conditionsValue={ listing.conditionValue }
              locationValue={ listing.locationValue }
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;