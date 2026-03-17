import "./button.styles.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
}

export const Button = ({
  children,
  className = "",
  size = "medium",
  ...props
}: ButtonProps) => {
  const classes = ["button", size, className].join(" ");
  return (
    <button className={classes} {...props}>
      <span className="button-inner">{children}</span>
    </button>
  );
};
