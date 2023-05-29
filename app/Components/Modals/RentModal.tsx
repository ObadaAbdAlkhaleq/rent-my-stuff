'use client';


import { useMemo, useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import CategoryInput from "../Inputs/CategoryInput";
import { categories } from "../navbar/Categories";
import AreaSelect from "../Inputs/AreaSelect";
import DropDown from "../Inputs/DropDown";
import Input from "../Inputs/Input";
import ImageUpload from "../Inputs/ImageUpload";
import TextFieldInput from "../Inputs/TextFieldInput";

import useRentModal from "@/app/hooks/useRentModal";

import axios from "axios";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

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
  const router = useRouter();

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
  const imageSrc = watch('imageSrc');

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios.post('/api/listings', data)
      .then(() => {
        toast.success('Listing added successfully!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrong try again later!');
      })
      .finally(() => {
        setIsLoading(false);
      });

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
        id=""
        title="What category fits your item?"
        subtitle="Choose a category"
      />
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[35vh] overflow-y-auto"
      >
        { categories.map((item) => (
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
          id=""
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
          id=""
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
          placeholder="What is this item used for?"
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

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          id=""
          title="Add photos of your item"
          subtitle="Show poeple what your item looks like..."
        />
        <ImageUpload
          value={ imageSrc }
          onChange={ (value) => setCustomValue('imageSrc', value) }
        />
      </div>
    );
  }

  if (step === STEPS.DESCREPTION) {
    bodyContent = (
      <div className="flex flex-col gap-7">
        <Heading
          id=""
          title="Describe your item..."
          subtitle="Please describe the item you you are listing. Include relevant details such as brand, model, size, color, etc."
        />
        <Input
          id="title"
          label="Title"
          disabled={ isLoading }
          register={ register }
          errors={ errors }
          required
        />
        <div className="border-b border-b-neutral-300"></div>
        <Input
          id="description"
          label="Description"
          disabled={ isLoading }
          register={ register }
          errors={ errors }
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="">
        <Heading
          id=""
          title="Now, lets talk money!"
          subtitle="Set your price"
        />
        <Input
          id="price"
          label="Price"
          type="number"
          disabled={ isLoading }
          register={ register }
          errors={ errors }
          required
          formatPrice
        />
      </div>
    );
  }

  return (
    <Modal
      title="Rent Your Stuff"
      isOpen={ rentModal.isOpen }
      onClose={ rentModal.onClose }
      onSubmit={ handleSubmit(onSubmit) }
      actionLabel={ actionLabel }
      secondaryAction={ step === STEPS.CATEGORY ? undefined : onPrev }
      secondaryActionLabel={ secondaryActionLabel }
      body={ bodyContent }
    />
  );
};

export default RentModal;;