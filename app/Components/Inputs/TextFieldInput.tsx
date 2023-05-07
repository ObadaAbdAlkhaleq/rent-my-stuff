'use client';

import {
  UseFormRegister,
  FieldValues,
  FieldErrors
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface TextFieldInputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors;
}

const TextFieldInput: React.FC<TextFieldInputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <textarea
        id={ id }
        disabled={ disabled }
        { ...register(id, { required }) }
        placeholder=" "
        required={ required }
        // type={type}
        className={ `
          resize-none
          h-[15vh]
          peer 
          w-full 
          p-4 
          pt-6 
          font-light 
          bg-white 
          border-2 
          rounded-xl 
          outline-none 
          transition 
          disabled:opacity-70 
          disabled:cursor-not-allowed text-neutral-900
          ${errors[ id ] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[ id ] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />
    </div>
  );
};

export default TextFieldInput;