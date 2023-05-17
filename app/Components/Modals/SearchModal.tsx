'use client';
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import AreaSelect, { AreaSelectValue } from "../Inputs/AreaSelect";
import qs from "query-string";
import DropDown, { ConditionSelectValue } from "../Inputs/DropDown";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../Inputs/Calendar";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const router = useRouter();

  const [ location, setLocation ] = useState<AreaSelectValue>();
  const [ condition, setCondition ] = useState<ConditionSelectValue>();
  const [ step, setStep ] = useState(STEPS.LOCATION);

  const [ dateRange, setDateRange ] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }), [ location ]);

  const onPrev = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      conditionValue: condition?.value
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [ step, searchModal, location, condition, router, dateRange, onNext, params ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search';
    }

    return 'Next';
  }, [ step ]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return 'Back';
  }, [ step ]);

  let bodyContent = (
    <div className=" flex flex-col gap-6">
      <Heading
        title="Set the location of where you are looking"
        subtitle=""
      />
      <AreaSelect
        value={ location }
        onChange={ (value) => setLocation(value as AreaSelectValue) }
      />
      <hr />
      <Map center={ location?.latlng } />
    </div>
  );
  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="">
        <Heading
          title="When do you plan to rent this item"
          subtitle="Selecting a range shows the items that are available during the dates"
        />
        <Calendar
          onChange={ (value) => setDateRange(value.selection) }
          value={ dateRange }
          month
        />
      </div>
    );
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="">
        <Heading
          title="What condition would you like the item to be"
          subtitle=""
        />
        <DropDown
          // @ts-ignore
          value={ condition }
          onChange={ (value) => setCondition(value as ConditionSelectValue) }
          choices={ [
            { value: "new", label: "New" },
            { value: "likenew", label: "Like New" },
            { value: "verygood", label: "Very Good" },
            { value: "good", label: "Good" },
            { value: "fair", label: "Fair" },
            { value: "poor", label: "Poor" }
          ] }
        />

      </div>
    );
  }

  return (
    <Modal
      isOpen={ searchModal.isOpen }
      onClose={ searchModal.onClose }
      onSubmit={ onSubmit }
      title="Filter"
      actionLabel={ actionLabel }
      secondaryActionLabel={ secondaryActionLabel }
      secondaryAction={ step === STEPS.LOCATION ? undefined : onPrev }
      body={ bodyContent }
    />
  );
};

export default SearchModal;