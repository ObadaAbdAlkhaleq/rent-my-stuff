'use client';

import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Button from "../Button";


import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues : {
      email : '',
      password : ''
    }
  });

  const onSubmit : SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn(
      'credentials', {
        ...data, redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok){
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback?.error)
      }
    })
  }
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to RentMyStuff"
        subtitle="Create an Account!"
      />
      <Input 
        id="email" 
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="password"  
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const switcher = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      {/* <br /> */}
      <div className="flex items-center justify-center">
        <div className="flex-grow border-t "></div>
        <div className="items-center text-sm px-6">or</div>
        <div className="flex-grow border-t "></div>
      </div>
      <Button 
        onClick={() => signIn("facebook")}
        outline
        label="Continue with Facebook"
        icon={BsFacebook}
        />
      <Button 
        onClick={() => signIn('google')}
        outline
        label="Continue with Google"
        icon={FcGoogle}
      />
      <div className="text-neutral-500 text-center mt-4 font-light ">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Don't have an account?</div>
          <div onClick={switcher} className="text-neutral-950 cursor-pointer hover:underline">Sign up</div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;