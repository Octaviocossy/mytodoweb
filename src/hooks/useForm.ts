import { ChangeEvent, useState } from 'react';

const useForm = <T extends Object>(initialState: T) => {
  const [data, setData] = useState(initialState);
  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>): void => {
    setData({ ...data, [name]: value });
  };
  return { data, handleChange };
};

export default useForm;
