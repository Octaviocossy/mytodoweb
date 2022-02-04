import { ChangeEvent } from 'react';

type InputBox = {
  type: string;
  placeholder?: string;
  styles?: string;
  name: string;
  handleChange: ({ target }: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ type, name, styles, placeholder, handleChange }: InputBox) => {
  return (
    <input
      onChange={handleChange}
      type={type}
      name={name}
      placeholder={placeholder}
      className={styles}
      autoComplete="off"
    />
  );
};

export default Input;
