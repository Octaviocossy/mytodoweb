interface Props {
  textStyles?: string;
  styles?: string;
  title: string;
}

const Alert: React.FC<Props> = ({ title, styles, textStyles }) => {
  return (
    <div
      className={`p-3 bg-red-200 mb-2 border-l-4 border-red-400 rounded-md w-80 md:w-96 ${styles}`}
    >
      <p className={`text-lg text-red-800 ${textStyles}`}>{title}</p>
    </div>
  );
};

export default Alert;
