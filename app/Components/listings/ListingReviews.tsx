'use client';

import { useState } from "react";
import Button from "../Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../Inputs/Input";
import TextFieldInput from "../Inputs/TextFieldInput";
// import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeListing, SafeUser } from "@/app/types";
import useLoginModal from "@/app/hooks/useLoginModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface ListingReviewsProps {
  comment: string;
  reviewerName?: string | null;
  rating: number;
  // onSubmit: (comment: string, rating: number) => void;
  disabled?: boolean;
  listing: SafeListing & {
    user: SafeUser;
  };
}


const ListingReviews: React.FC<ListingReviewsProps> = ({ comment, rating, disabled, listing, reviewerName }) => {
  const [ isLoading, setIsLoading ] = useState(false);
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset } = useForm<FieldValues>({
      defaultValues: {
        comment: '',
        rating: 1
      }
    });

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    // if (!currentUser) return loginModal.onOpen();
    setIsLoading(true);
    axios.post('/api/ratings', { comment: data.comment, rating: data.rating, listingId: listing?.id, authorName: reviewerName })
      .then(() => {
        toast.success('Review created successfully');
      }).catch((error) => {
        toast.error(error);
      }).finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="col-span-8 flex flex-col gap-8">
      <Input
        id="rating"
        label="Rating"
        type="number"
        disabled={ isLoading }
        register={ register }
        errors={ errors }
        required
      />
      <TextFieldInput
        id="comment"
        label="Comment"
        placeholder="Add a comment..."
        disabled={ isLoading }
        register={ register }
        errors={ errors }
        required
      />
      <Button
        disabled={ disabled }
        label="Create Review"
        onClick={ handleSubmit(handleFormSubmit) }
      />
    </div>
  );
};

export default ListingReviews;