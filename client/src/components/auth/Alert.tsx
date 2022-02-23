interface Props {
  title: string;
}

const Alert: React.FC<Props> = ({ title }) => {
  return (
    <div className="p-3 bg-red-200 mb-4 border-l-4 border-red-400 rounded-md">
      <p className="text-lg text-red-800">{title}</p>
    </div>
  );
};

export default Alert;
