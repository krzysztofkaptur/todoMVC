import { ReactNode } from "react";

type Button = "submit" | "reset" | "button" | undefined;

type Props = {
  children: ReactNode;
  type?: Button;
  onClick?: () => void;
};

export const Button = (props: Props) => {
  const { type = "button", children, onClick } = props;
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};
