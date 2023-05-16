import ClientOnly from "../Components/ClientOnly";
import EmptyState from "../EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getSavedListings from "../actions/getSavedListings";
import SavedClient from "./SavedClient";

const ListingPage = async () => {
  const listings = await getSavedListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {

    return (
      <ClientOnly>
        <EmptyState
          title="No Saved Listings found"
          subtitle="Looks like you have not saved any Listings"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <SavedClient
        listings={ listings }
        currentUser={ currentUser }
      />
    </ClientOnly>
  );
};

export default ListingPage;