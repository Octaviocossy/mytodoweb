interface Props {
  value: string;
  styles: string;
}

const Label: React.FC<Props> = ({ value, styles }) => {
  return <label className={`text-gray-700 ${styles}`}>{value}</label>;
};

export default Label;
