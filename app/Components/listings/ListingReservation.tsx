'use client';

import { Range } from "react-date-range";
import Calendar from "../Inputs/Calendar";
import Button from "app/Components/Button";

interface ListingReservationProps {
  price: number;
  dateRange: Range,
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price, totalPrice, onChangeDate, dateRange, onSubmit, disabled, disabledDates
}) => {
  return (
    <div className="bg-white border border-neutral-200 overflow-hidden rounded-xl">
      <div className="flex flex-row items-end gap-1 p-4">
        <div className="text-2xl font-semibold">
          $ { price }
        </div>
        <div className="font-light text-neutral-600">
          hour
        </div>
      </div>
      <hr />
      <Calendar
        value={ dateRange }
        disabledDates={ disabledDates }
        onChange={ (value) => onChangeDate(value.selection) }
      />
      <hr />
      <div className="flex flex-col p-4 space-y-4">
        <Button
          disabled={ disabled }
          label="Reserve"
          onClick={ onSubmit }
        />
        {/* TODO: reserve now functionality */ }
        <Button
          disabled={ disabled }
          label="Reserve Now"
          onClick={ () => { } }
          outline
        />
      </div>
      <hr />
      <div className="flex flex-row justify-between items-center p-4 font-semibold text-lg">
        <div className="">Total</div>
        <div className="">{ totalPrice }</div>
      </div>
    </div>
  );
};

export default ListingReservation;