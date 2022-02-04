type Btn = {
  type: 'button' | 'submit';
  value: JSX.Element | string;
  styles?: string;
  action?: () => void;
  disabled?: boolean;
};

const Button = ({ type, value, styles, action, disabled }: Btn) => {
  return (
    <button onClick={action} className={styles} type={type} disabled={disabled}>
      {value}
    </button>
  );
};

export default Button;
