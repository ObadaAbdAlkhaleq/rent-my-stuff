'use client';

import { Range } from "react-date-range";
import Calendar from "../Inputs/Calendar";
import Button from "app/Components/Button";
import { useCallback, useState } from "react";
import Heading from "../Heading";
import { format } from "date-fns";
import { BiStar } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { AiFillFlag } from "react-icons/ai";

interface ListingReservationProps {
  price: number;
  dateRange: Range,
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  reviewsAmount: number;
  averageRating: number;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price, totalPrice, onChangeDate, dateRange, onSubmit, disabled, disabledDates, reviewsAmount, averageRating
}) => {
  const [ isClicked, setIsClicked ] = useState(false);
  const [ isCleared, setIsCleared ] = useState(false);
  const openCalendar = useCallback(() => {
    setIsClicked((value) => !value);

  }, []);
  const start = new Date(dateRange?.startDate || "");
  const end = new Date(dateRange?.endDate || "");
  const handleClearDates = () => {
    onChangeDate({
      startDate: undefined,
      endDate: undefined,
      key: 'selection'
    });
    setIsCleared(true);
  };
  return (
    <div className="">
      <div className="bg-white border border-neutral-200 overflow-hidden rounded-xl shadow-lg">
        <div className="flex flex-row justify-between items-end gap-1 p-4">
          <div className="flex flex-row items-end gap-1">
            <div className="text-2xl font-semibold">
              $ { price }
            </div>
            <div className="font-light text-neutral-600">
              hour
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-row items-center justify-around gap-1">
              <div className="flex items-center font-semibold">
                <BsFillStarFill />
                <div className="font-semibold">
                  { averageRating } ·
                </div>
              </div>
              <div className="text-sm underline text-neutral-600 font-medium">
                { reviewsAmount } reviews
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="hidden md:grid grid-cols-2 grid-rows-2 mx-8 my-4 border-[1px] border-black rounded-xl">
          <div
            onClick={ openCalendar }
            className="
            flex justify-between col-span-2 border-collapse hover:border-black
          ">
            <div className="flex flex-col items-start justify-center grow border-r border-black cursor-pointer focus:rounded-xl focus:border-2 p-2">
              <span className="text-xs font-semibold uppercase">Start Date</span>
              <div className="text-zinc-400">{ start ? start.toLocaleDateString() : "Add Date" }</div>
            </div>
            <div className="flex flex-col items-start justify-center grow cursor-pointer focus:border-2 border-l focus:border-black focus:rounded-xl p-2">
              <span className="text-xs font-semibold uppercase">End Date</span>
              <div className="text-zinc-400">{ end ? end.toLocaleDateString() : "Add Date" }</div>
            </div>
          </div>
          <div className="flex flex-col col-span-2 items-start justify-center border-t focus:border-2 border-black cursor-pointer p-2">
            <span className="text-xs font-semibold uppercase">TBD</span>
            <div className="text-zinc-400">TBD</div>
          </div>
          { isClicked && (
            <div
              className="inline-block absolute top-[3.625rem] -right-1 rounded-xl z-50 bg-white w-[41rem] text-sm shadow-2xl"
            >
              <div className="p-6">
                <div className="flex flex-row justify-between">
                  <Heading
                    title="Selecte dates"
                    subtitle="When are you looking to rent this item"
                    id=""
                  />
                  <div className="flex flex-row justify-between grow-[.7] border-4 border-black rounded-xl">
                    <div className="flex flex-col items-start justify-center grow border-r border-black cursor-pointer rounded-xl p-2">
                      <span className="text-xs font-semibold uppercase">Start Date</span>
                      <div className="text-zinc-400">{ start ? start.toLocaleDateString() : "MM/DD/YYYY" }</div>
                    </div>
                    <div className="flex flex-col items-start justify-center grow cursor-pointer focus:border-2 border-l focus:border-black focus:rounded-xl p-2">
                      <span className="text-xs font-semibold uppercase">End Date</span>
                      <div className="text-zinc-400">{ end ? end.toLocaleDateString() : "MM/DD/YYYY" }</div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <Calendar
                    value={ dateRange }
                    disabledDates={ disabledDates }
                    onChange={ (value) => onChangeDate(value.selection) }
                    horizontal
                  />
                </div>
                <div className="flex flex-row justify-end items-center gap-4">
                  <div
                    onClick={ handleClearDates }
                    className="font-semibold text-sm underline p-2 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                  >
                    Clear
                  </div>
                  <div
                    onClick={ openCalendar }
                    className="bg-black text-white text-base font-semibold cursor-pointer px-4 py-1 rounded-lg"
                  >
                    Close
                  </div>
                </div>
              </div>
            </div>
          )
          }
        </div>
        <div className="md:hidden">
          <Calendar
            value={ dateRange }
            disabledDates={ disabledDates }
            onChange={ (value) => onChangeDate(value.selection) }
          />
        </div>
        <hr />
        <div className="flex flex-col p-4 space-y-4">
          <Button
            disabled={ disabled }
            label="Reserve"
            onClick={ onSubmit }
          />
          {/* TODO: reserve now functionality */ }
          {/* <Button
            disabled={ disabled }
            label="Reserve Now"
            onClick={ () => { } }
            outline
          /> */}
        </div>
        <hr />
        <div className="flex flex-row justify-between items-center p-4 font-semibold text-lg">
          <div className="">Total</div>
          <div className="">{ totalPrice }</div>
        </div>
      </div>
      {/* TODO: Report Modal */ }
      <div
        onClick={ () => { } }
        className="text-sm text-neutral-500 mt-6 flex flex-row items-center justify-center gap-4"
      >
        <AiFillFlag />
        <div className=" underline hover:cursor-pointer">Report this listing</div>
      </div>
    </div>
  );
};

export default ListingReservation;