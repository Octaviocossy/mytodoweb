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
      autoComplete="off"
      className={styles}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={handleChange}
    />
  );
};

export default Input;
