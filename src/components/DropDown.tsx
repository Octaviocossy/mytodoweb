import { useState } from 'react';
import { RiMenu5Line } from 'react-icons/ri';
import Button from '../ui/Button';

const DropDown = () => {
  const [togglelist, setToggleList] = useState<boolean>(false);
  return (
    <>
      <Button
        value={<RiMenu5Line />}
        styles="bg-gray-100 absolute top-3 right-3 cursor-pointer text-2xl p-1 rounded-md shadow-md text-gray-700 hover:text-yellow-500"
        type="button"
        action={() => setToggleList((state) => !state)}
      />
      {togglelist && (
        <div className="absolute top-12 right-12 bg-gray-100 cursor-pointer text-lg rounded-md shadow-md text-gray-700 flex flex-col">
          <Button
            value="All"
            styles="border-b-2 p-2 hover:bg-gray-200 rounded-t-md"
            type="button"
          />
          <Button
            value="Completed"
            styles="border-b-2 p-2 hover:bg-gray-200"
            type="button"
          />
          <Button
            value="Pending"
            styles="border-b-2 p-2 hover:bg-gray-200 rounded-b-md"
            type="button"
          />
        </div>
      )}
    </>
  );
};

export default DropDown;
