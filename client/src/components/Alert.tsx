interface Props {
  title: string;
  type?: string;
}

const Alert: React.FC<Props> = ({ title, type }) => {
  return (
    <div
      className={`${
        type === 'alert'
          ? 'bg-red-200 mb-2 border-red-400'
          : 'mb-6 mx-auto bg-yellow-200 border-yellow-400'
      } p-3 border-l-4 rounded-md w-80 md:w-96`}
    >
      <p
        className={`text-lg ${
          type === 'alert' ? 'text-red-800' : 'text-yellow-800'
        }`}
      >
        {title}
      </p>
    </div>
  );
};

export default Alert;
