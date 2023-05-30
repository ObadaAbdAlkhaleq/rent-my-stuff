'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { SafeListing, SafeReservation, SafeReviews, SafeUser } from "@/app/types";
import { categories } from "@/app/Components/navbar/Categories";
import Container from "@/app/Components/Container";
import ListingHead from "../../Components/listings/ListingHead";
import ListingInfo from "@/app/Components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import ListingReservation from "@/app/Components/listings/ListingReservation";
import ListingReviews from "@/app/Components/listings/ListingReviews";
import ReviewCard from "@/app/Components/ReviewCard";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  reviews?: SafeReviews[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({ listing, currentUser, reservations = [], reviews = [] }) => {

  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [ ...dates, ...range ];
    });

    return dates;
  }, [ reservations ]);

  const [ isLoading, setIsLoading ] = useState(false);
  const [ totalPrice, setTotalPrice ] = useState(listing.price);
  const [ rating, setRating ] = useState(1);
  const [ comment, setComment ] = useState("");
  const [ dateRange, setDateRange ] = useState<Range>(initialDateRange);

  const reviewsAmount = reviews.length;
  let totalRating = 0;
  for (let i = 0; i < reviewsAmount; i++) {
    totalRating += reviews[ i ].rating;
  }
  const averageRating = totalRating / reviewsAmount;

  console.log(currentUser?.name);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();
    setIsLoading(true);
    axios.post('/api/reservations', {
      totalPrice, startDate: dateRange.startDate, endDate: dateRange.endDate, listingId: listing?.id
    }).then(() => {
      toast.success('Reservation request completed successfully');
      setDateRange(initialDateRange);
      router.push('/reserved');
    }).catch(() => {
      toast.error('something went wrong');
    }).finally(() => {
      setIsLoading(false);
    });
  }, [ totalPrice, dateRange, listing?.id, router, currentUser, loginModal ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [ dateRange, listing.price ]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [ listing.category ]);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto pt-20">
        <div className="flex flex-col gap-1">
          <ListingHead
            data={ listing }
            title={ listing.title }
            imageSrc={ listing.imageSrc }
            locationValue={ listing.locationValue }
            id={ listing.id }
            currentUser={ currentUser }
          />
          <div className="grid grid-cols-1 md:grid-cols-8 md:gap-10 mt-4">
            <ListingInfo
              user={ listing.user }
              category={ category }
              description={ listing.description }
              usage={ listing.usage }
              conditionsValue={ listing.conditionValue }
              locationValue={ listing.locationValue }
            />

            <div className="order-first sm:order-none md:col-span-3">
              <div className="top-16 z-40 sticky">
                <ListingReservation
                  reviewsAmount={ reviewsAmount }
                  averageRating={ averageRating }
                  price={ listing.price }
                  totalPrice={ totalPrice }
                  onChangeDate={ (value) => setDateRange(value) }
                  dateRange={ dateRange }
                  onSubmit={ onCreateReservation }
                  disabled={ isLoading }
                  disabledDates={ disabledDates }
                />
              </div>
            </div>

            <div className="grid col-span-1 md:col-span-8 gap-4">
              <ListingReviews
                reviewerName={ currentUser?.name }
                listing={ listing }
                comment={ comment }
                rating={ rating }
                disabled={ isLoading }
              />
              {
                reviews.map((review) => (
                  <div key={ review.id } className="col-span-1 md:col-span-4 gap-4">
                    <ReviewCard
                      user={ currentUser }
                      comment={ review.comment }
                      rating={ review.rating }
                      createdAt={ review.createdAt }
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;