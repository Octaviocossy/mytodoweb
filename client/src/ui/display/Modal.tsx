interface Props {
  component: JSX.Element;
}

const Modal: React.FC<Props> = ({ component }) => {
  return (
    <div className="bg-gray-500/50 max-w-full absolute right-0 top-0 left-0 bottom-0 flex justify-center items-center">
      <div className="bg-gray-200 rounded-lg">{component}</div>
    </div>
  );
};

export default Modal;
