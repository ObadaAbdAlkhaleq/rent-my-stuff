'use client';

import { useRouter } from "next/navigation";
import Container from "../Components/Container";
import Heading from "../Components/Heading";
import { SafeListing, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../Components/ListingCard";

interface SavedClientProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
}

const SavedClient: React.FC<SavedClientProps> = ({ listings, currentUser }) => {
  return (
    <Container>
      <Heading
        title="Saved"
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
            currentUser={ currentUser }
          />
        )) }
      </div>
    </Container>
  );
};

export default SavedClient;