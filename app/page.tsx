import ClientOnly from "./Components/ClientOnly";
import Container from "./Components/Container";
import ListingCard from "./Components/ListingCard";
import EmptyState from "./EmptyState";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "@/app/actions/getListings";
interface HomeProps {
  searchParams: IListingsParams;
};

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
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
        gap-8
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
};

export default Home;
export const dynamic = "force-dynamic";
