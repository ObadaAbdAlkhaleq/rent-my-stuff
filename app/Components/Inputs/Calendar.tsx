'use client';

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


interface CalendarProps {
  value: Range,
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
  month?: boolean;
}


const Calendar: React.FC<CalendarProps> = ({ value, disabledDates, onChange, month }) => {
  let months = 2;
  if (month) {
    months = 1;
  }
  return (
    <DateRange
      rangeColors={ [ "#262626" ] }
      ranges={ [ value ] }
      date={ new Date() }
      onChange={ onChange }
      direction="vertical"
      showDateDisplay={ false }
      minDate={ new Date() }
      disabledDates={ disabledDates }
      months={ months }
    />
  );
};

export default Calendar;