'use client';

import { useRouter } from "next/navigation";
import Container from "../Components/Container";
import Heading from "../Components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../Components/ListingCard";

interface ReservedClientProps {
  reservations: SafeReservation[],
  currentUser?: SafeUser | null,
}

const ReservedClient: React.FC<ReservedClientProps> = ({ reservations, currentUser }) => {
  const router = useRouter();
  const [ deletingId, setDeletingId ] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success('reservations canceled successfully');
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
        title="Reserved"
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
        { reservations.map((reservation: any) => (
          <ListingCard
            key={ reservation.id }
            data={ reservation.listing }
            reservation={ reservation }
            actionId={ reservation.id }
            onAction={ onCancel }
            disabled={ deletingId === reservation.id }
            actionLabel="Cancel reservation"
            currentUser={ currentUser }
          />
        )) }
      </div>
    </Container>
  );
};

export default ReservedClient;