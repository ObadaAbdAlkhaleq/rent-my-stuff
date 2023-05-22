'use client';

import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";

import axios from "axios";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Button from "../Button";

import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [ isLoading, setIsLoading ] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register/', data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error("something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        id=""
        title="Welcome to RentMyStuff"
        subtitle="Create an Account!"
      />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={ isLoading }
        register={ register }
        errors={ errors }
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={ isLoading }
        register={ register }
        errors={ errors }
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={ isLoading }
        register={ register }
        errors={ errors }
        required
      />
    </div>
  );

  const switcher = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [ registerModal, loginModal ]);

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      {/* <br /> */ }
      <div className="flex items-center justify-center">
        <div className="flex-grow border-t "></div>
        <div className="items-center text-sm px-6">or</div>
        <div className="flex-grow border-t "></div>
      </div>
      <Button
        onClick={ () => signIn("facebook") }
        outline
        label="Sign up using Facebook"
        icon={ BsFacebook }
      />
      <Button
        onClick={ () => signIn('google') }
        outline
        label="Continue with Google"
        icon={ FcGoogle }
      />
      <div className="text-neutral-500 text-center mt-4 font-light ">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have an account?</div>
          <div onClick={ switcher } className="text-neutral-950 cursor-pointer hover:underline">Login</div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={ isLoading }
      isOpen={ registerModal.isOpen }
      title="Register"
      actionLabel="Continue"
      onClose={ registerModal.onClose }
      onSubmit={ handleSubmit(onSubmit) }
      body={ bodyContent }
      footer={ footerContent }
    />
  );
};

export default RegisterModal;