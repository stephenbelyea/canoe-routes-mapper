import { CheckCircle, XmarkCircle } from "@vectoricons/atlas-icons-react";
import "./button.styles.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  toggle?: boolean;
  pressed?: boolean;
}

export const Button = ({
  children,
  className = "",
  size = "medium",
  toggle = false,
  pressed = undefined,
  ...props
}: ButtonProps) => {
  const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    className: ["button", size, className].join(" "),
    type: "button",
    ...props,
  };

  if (toggle) {
    buttonProps["aria-pressed"] = pressed;
  }

  return (
    <button {...buttonProps}>
      <span className="button-inner">
        {toggle ? (
          <span className="icon" aria-hidden="true">
            {pressed ? <CheckCircle /> : <XmarkCircle />}
          </span>
        ) : null}
        <span className="text">{children}</span>
      </span>
    </button>
  );
};
