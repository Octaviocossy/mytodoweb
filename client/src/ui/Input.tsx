import { ChangeEvent } from 'react';

type InputBox = {
  type: string;
  value?: string;
  placeholder?: string;
  styles?: string;
  name: string;
  handleChange: ({ target }: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  type,
  name,
  styles,
  placeholder,
  handleChange,
  value,
}: InputBox) => {
  return (
    <input
      onChange={handleChange}
      type={type}
      name={name}
      placeholder={placeholder}
      className={styles}
      autoComplete="off"
      value={value}
    />
  );
};

export default Input;
