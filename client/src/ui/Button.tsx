type Btn = {
  type: 'button' | 'submit';
  value: JSX.Element | string;
  styles?: string;
  action?: () => void;
  disabled?: boolean;
};

const Button = ({ type, value, styles, action, disabled }: Btn) => {
  return (
    <button className={styles} disabled={disabled} type={type} onClick={action}>
      {value}
    </button>
  );
};

export default Button;
