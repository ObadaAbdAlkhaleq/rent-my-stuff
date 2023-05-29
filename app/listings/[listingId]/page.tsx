import EmptyState from "@/app/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import ListingClient from "./ListingClient";
import ClientOnly from "@/app/Components/ClientOnly";
import getReviews from "@/app/actions/getReviews";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams; }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();
  const reviews = await getReviews(params);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <div className="">
      <ClientOnly>
        <ListingClient
          listing={ listing }
          reviews={ reviews }
          reservations={ reservations }
          currentUser={ currentUser }
        />
      </ClientOnly>
    </div>
  );
};

export default ListingPage;