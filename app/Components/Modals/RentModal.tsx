'use client';

import { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { catagories } from "../navbar/Catagories";
import CategoryBox from "../navbar/CategoryBox";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";

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
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {register, handleSubmit, setValue, watch, formState: {errors,}, reset} = useForm<FieldValues>({
    defaultValues:{
      category: '',
      location: '',
      used: '',
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });

  const category = watch('category');
  const setCustomValue = (id: string, value:any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    })
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
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, []);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading 
        title="What category fits your item?"
        subtitle="Choose a category"
      />
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[35vh] overflow-y-auto"
      >
        {catagories.map((item) => (
          <div key={item.label} className="">
            <CategoryInput
              onClick={(category) => 
                setCustomValue('category', category)
              }
              selected = {category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <Modal
      title="Rent Your Stuff"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onPrev}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
};

export default RentModal;