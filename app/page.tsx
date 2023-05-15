import ClientOnly from "./Components/ClientOnly";
import Container from "./Components/Container";
import ListingCard from "./Components/ListingCard";
import EmptyState from "./EmptyState";
import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }


  return (
    <ClientOnly>
      <Container>
        <div
          className="
        pt-24 
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        "
        >
          { listings.map((listing) => {
            return (
              <ListingCard
                key={ listing.id }
                currentUser={ currentUser }
                data={ listing }
              />
            );
          }) }
        </div>
      </Container>
    </ClientOnly>
  );
}
