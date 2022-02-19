import { useState } from 'react';
import { RiMenu5Line } from 'react-icons/ri';

import Button from '../ui/Button';

type props = {
  setFilterState: React.Dispatch<React.SetStateAction<string>>;
};

const DropDown = ({ setFilterState }: props) => {
  const [togglelist, setToggleList] = useState<boolean>(false);
  const handleClick = (text: string): void => {
    setFilterState(text);
    setToggleList((state) => !state);
  };

  return (
    <>
      <Button
        action={() => setToggleList((state) => !state)}
        styles="bg-gray-100 absolute top-3 right-3 cursor-pointer text-2xl p-1 rounded-md shadow-md text-gray-700 hover:text-yellow-500"
        type="button"
        value={<RiMenu5Line />}
      />
      {togglelist && (
        <div className="absolute top-12 right-12 bg-gray-100 cursor-pointer text-lg rounded-md shadow-md text-gray-700 flex flex-col">
          <Button
            action={() => handleClick('all')}
            styles="border-b-2 p-2 hover:bg-gray-200 rounded-t-md"
            type="button"
            value="All"
          />
          <Button
            action={() => handleClick('completed')}
            styles="border-b-2 p-2 hover:bg-gray-200"
            type="button"
            value="Completed"
          />
          <Button
            action={() => handleClick('pending')}
            styles="border-b-2 p-2 hover:bg-gray-200 rounded-b-md"
            type="button"
            value="Pending"
          />
        </div>
      )}
    </>
  );
};

export default DropDown;
