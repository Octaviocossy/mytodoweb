interface Props {
  type: 'button' | 'submit';
  value: JSX.Element | string;
  styles?: string;
  action?: () => void;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({ type, value, styles, action, disabled }) => {
  return (
    <button
      className={`${styles} outline-none`}
      disabled={disabled}
      type={type}
      onClick={action}
    >
      {value}
    </button>
  );
};

export default Button;
