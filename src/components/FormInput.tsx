import React from "react";
interface IProps {
  name: string;
  type: string;
  placeHolder: string;
  id: string;
  label: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<IProps> = ({
  name,
  type,
  placeHolder,
  id,
  label,
  error,
}) => {
  return (
    <>
      <label className="text-white test">{label}</label>
      <input
        className="focus:outline-none rounded-md py-2 px-2 invalid:border-red-500"
        placeholder={placeHolder}
        name={name}
        type={type}
        id={id}
      />
      <span className="text-secondary">{error}</span>
    </>
  );
};

export default FormInput;
