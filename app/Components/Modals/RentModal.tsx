'use client';

import { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { catagories } from "../navbar/Catagories";
import CategoryBox from "../navbar/CategoryBox";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import AreaSelect from "../Inputs/AreaSelect";
import dynamic from "next/dynamic";
import DropDown from "../Inputs/DropDown";
import Input from "../Inputs/Input";
import TextFieldInput from "../Inputs/TextFieldInput";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCREPTION = 4,
  PRICE = 5
}

const RentModal = () => {

  const rentModal = useRentModal();
  const [ step, setStep ] = useState(STEPS.CATEGORY);
  const [ isLoading, setIsLoading ] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors, }, reset } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: '',
      condition: '',
      usage: '',
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });

  const category = watch('category');
  const location = watch('location');
  const condition = watch('condition');

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }), [ location ]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  const onPrev = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }

    return 'Next';
  }, [ step ]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [ step ]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="What category fits your item?"
        subtitle="Choose a category"
      />
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[35vh] overflow-y-auto"
      >
        { catagories.map((item) => (
          <div key={ item.label } className="">
            <CategoryInput
              onClick={ (category) =>
                setCustomValue('category', category)
              }
              selected={ category === item.label }
              label={ item.label }
              icon={ item.icon }
            />
          </div>
        )) }
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-7">
        <Heading
          title="Where is your item located?"
          subtitle="let others know where can they find your item?"
        />
        <AreaSelect
          value={ location }
          onChange={ (value) => setCustomValue('location', value) }
        />
        <Map
          center={ location?.latlng }
        />
      </div>
    );
  }

  // console.log(location);

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Give info on your item"
          subtitle="How to use it? any notes for the other users to consider when renting your item,"
        />
        <div className="flex flex-row items-center justify-between py-5 border-t border-t-neutral-300 border-b border-b-neutral-300">
          <div className="flex flex-col">
            <div className="font-medium text-lg">
              { "Condition:" }
            </div>
            <div className="font-light text-gray-600 text-sm">
              { "What fits the condetion of your item?" }
            </div>
          </div>
          <DropDown
            value={ condition }
            onChange={ (value) => setCustomValue('condition', value) }
            choices={ [
              { value: "new", label: "New" },
              { value: "likenew", label: "Like New" },
              { value: "verygood", label: "Very Good" },
              { value: "good", label: "Good" },
              { value: "fair", label: "Fair" },
              { value: "poor", label: "Poor" }
            ] }
          />
          {/* <DropDown
            // label="Condition:"
            // sublabel="What fits the condetion of your item?"
            value={ condition }
            onChange={ (value) => setCustomValue('condition', value) }
          /> */}
        </div>
        <div className="flex flex-col">
          <div className="font-medium text-lg">
            { "Usage:" }
          </div>
          <div className="font-light text-gray-700 text-sm">
            { "To the best of your ability describe what is item used for!" }
          </div>
        </div>
        <TextFieldInput
          id="usage"
          label="Usage"
          disabled={ isLoading }
          register={ register }
          errors={ errors }
          required
        // big
        />

      </div>
    );
  }

  // console.log(condition);

  return (
    <Modal
      title="Rent Your Stuff"
      isOpen={ rentModal.isOpen }
      onClose={ rentModal.onClose }
      onSubmit={ onNext }
      actionLabel={ actionLabel }
      secondaryAction={ step === STEPS.CATEGORY ? undefined : onPrev }
      secondaryActionLabel={ secondaryActionLabel }
      body={ bodyContent }
    />
  );
};

export default RentModal;;