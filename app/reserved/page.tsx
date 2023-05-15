import EmptyState from "../EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservedClient from "./ReservedClient";
import ClientOnly from "../Components/ClientOnly";

const ReservedPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser?.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reserved items found"
          subtitle="Looks like you have not reserved any items"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservedClient
        reservations={ reservations }
        currentUser={ currentUser }
      />
    </ClientOnly>
  );
};

export default ReservedPage;