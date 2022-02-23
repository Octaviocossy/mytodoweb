import { ChangeEvent } from 'react';

interface Props {
  type: string;
  value?: string;
  placeholder?: string;
  styles?: string;
  name: string;
  handleChange?: ({ target }: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({
  type,
  name,
  styles,
  placeholder,
  handleChange,
  value,
}) => {
  return (
    <input
      autoComplete="off"
      className={`${styles} max-w-xs sm:max-w-md p-3 w-96 outline-none shadow-md rounded-md mb-3 text-gray-700`}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={handleChange}
    />
  );
};

export default Input;
