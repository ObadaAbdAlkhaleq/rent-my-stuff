'use client';

import { useRouter } from "next/navigation";
import Container from "../Components/Container";
import Heading from "../Components/Heading";
import { SafeListing, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../Components/ListingCard";

interface ItemsClientProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
}

const ItemsClient: React.FC<ItemsClientProps> = ({ listings, currentUser }) => {
  const router = useRouter();
  const [ deletingId, setDeletingId ] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/listings/${id}`)
      .then(() => {
        toast.success('Listing Removed successfully');
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setDeletingId('');
      });
  }, [ router ]);

  return (
    <Container>
      <Heading
        id=""
        title="Items"
        subtitle="Where you been where youre going?"
      />
      <div
        className="
          mt-10 gap-8
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        { listings.map((listing: any) => (
          <ListingCard
            key={ listing.id }
            data={ listing }
            actionId={ listing.id }
            onAction={ onCancel }
            disabled={ deletingId === listing.id }
            actionLabel="Remove listing"
            currentUser={ currentUser }
          />
        )) }
      </div>
    </Container>
  );
};

export default ItemsClient;