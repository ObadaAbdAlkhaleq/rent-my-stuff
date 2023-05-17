'use client';
import Slider from "react-slick";
import "node_modules/slick-carousel/slick/slick-theme.css";
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

    return `${format(start, "MMM dd, yy")} - ${format(end, "PP")}`;
  }, [ reservation ]);

  return (
    <div
      onClick={ () => router.push(`/listings/${data.id}`) }
      className="col-span-1 cursor-pointer group "
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl shadow-sm">
          <Image
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
            // style={ { objectFit: "contain" } }
            src={ data.imageSrc[ 0 ] }
            alt={ `${data.title} image` }
          />
        </div>
        <div className="absolute top-3 right-3">
          <HeartButton listingId={ data.id } currentUser={ currentUser } />
        </div>
        <div className="font-semibold text-lg">{ data?.title }</div>
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