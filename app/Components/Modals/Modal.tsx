"use client";

import Button from "../Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import { useCallback, useEffect, useRef, useState, } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen, onClose, onSubmit, title, body, footer, actionLabel, secondaryAction, disabled, secondaryActionLabel
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [ showModal, setShowModal ] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [ isOpen ]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return false;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [ disabled, onClose ]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [ disabled, onSubmit ]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [ disabled, secondaryAction ]);

  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClickOutsideModal = useCallback(
    (event: MouseEvent) => {
      if (overlayRef.current && event.target === overlayRef.current) {
        handleClose();
      }
    },
    [ handleClose ]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.addEventListener('click', handleClickOutsideModal);
    }

    return () => {
      document.body.removeEventListener('click', handleClickOutsideModal);
    };
  }, [ isOpen, handleClickOutsideModal ]);

  if (!isOpen) {
    return null;
  }

  return (
    <>

      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
        ref={ overlayRef }
      >
        <div
          className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto lg:h-auto ">
          {/* content */ }
          <div
            className={ `translate duration-300 h-full 
                      ${showModal ? 'translate-y-0' : 'translate-y-full'}
                      ${showModal ? 'opacity-100' : 'opacity-0'}
                    `} >
            <div
              className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* header */ }
              <div
                className="flex items-center p-5 rounded-t justify-center relative border-b-[1px]">
                <button
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                  onClick={ handleClose }
                >
                  <IoMdClose size={ 16 } />
                </button>
                <div className="text-lg font-semibold">
                  { title }
                </div>
              </div>
              <div className="p-5 relative flex-auto">

                {/* body */ }
                { body }
              </div>
              {/* footer */ }
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  { secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={ disabled }
                      label={ secondaryActionLabel }
                      onClick={ handleSecondaryAction }
                    />
                  ) }
                  <Button
                    disabled={ disabled }
                    label={ actionLabel }
                    onClick={ handleSubmit }
                  />
                </div>
                { footer }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;