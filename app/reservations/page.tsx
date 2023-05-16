import ClientOnly from "../Components/ClientOnly";
import EmptyState from "../EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";


const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    <ClientOnly>
      <EmptyState
        title="Unauthorized"
        subtitle="Login"
      />
    </ClientOnly>;
  }

  const reservations = await getReservations({
    authorId: currentUser?.id
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Reservations found"
          subtitle="Looks like none of your items are reserved"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        currentUser={ currentUser }
        reservations={ reservations }
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
