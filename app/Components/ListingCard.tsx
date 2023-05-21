'use client';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { SafeListing, SafeReservation, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import useAreas from "../hooks/useAreas";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "./HeartButton";
import Button from "./Button";
import { useCallback, useMemo } from "react";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionId = "",
  actionLabel,
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useAreas();
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;

      onAction?.(actionId);
    },
    [ disabled, onAction, actionId ]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [ reservation, data.price ]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "MMM dd, yy")} - ${format(end, "MMM dd, yy")}`;
  }, [ reservation ]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div
      onClick={ () => router.push(`/listings/${data.id}`) }
      className="col-span-1 cursor-pointer group hover:bg-neutral-50 transition ease-in-out delay-150 p-1 rounded-xl"
    >
      <div className="z-10 flex flex-col gap-2 w-full">
        <Carousel
          responsive={ responsive }
          dotListClass="custom-dot-list-style"
          removeArrowOnDeviceType={ [ "tablet", "mobile" ] }
          showDots={ true }
        >
          { data?.imageSrc?.length > 0 && data.imageSrc.map((image: string) => (
            <div className="aspect-square w-full relative overflow-hidden rounded-xl shadow-sm">
              <div className="absolute top-3 right-3 z-10">
                <HeartButton listingId={ data.id } currentUser={ currentUser } />
              </div>
              <Image
                fill
                className="object-cover h-full w-full hover:scale-110 transition"
                // style={ { objectFit: "contain" } }
                src={ image }
                alt={ `${data.title} image` }
              />
            </div>
          )) }
        </Carousel>
        <div className="font-semibold text-lg text-ellipsis line-clamp-1">{ data?.title }</div>
        <div className="font-light text-neutral-500 text-ellipsis line-clamp-1">{ location?.label }, { location?.region }</div>
        <div className="font-light text-neutral-500">{ reservationDate || data.category }</div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">${ price }</div>
          { !reservation && (
            <div className="font-light">/ Hour</div>
          ) }
        </div>
        {
          onAction && actionLabel && (
            <Button
              disabled={ disabled }
              small
              label={ actionLabel }
              onClick={ handleCancel }
            />
          )
        }
      </div >
    </div >
  );
};

export default ListingCard;