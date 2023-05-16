import EmptyState from "../EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import ItemsClient from "./ItemsClient";
import ClientOnly from "../Components/ClientOnly";

const ItemsPage = async () => {
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
  // @ts-ignore
  const listings = await getListings({ userId: currentUser?.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No listings found"
          subtitle="Looks like you have not listed any items for rent"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ItemsClient
        listings={ listings }
        currentUser={ currentUser }
      />
    </ClientOnly>
  );
};

export default ItemsPage;