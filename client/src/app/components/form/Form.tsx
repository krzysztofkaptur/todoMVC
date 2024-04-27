"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  onSubmit: () => void;
};

export const Form = (props: Props) => {
  const { children, className = "", onSubmit } = props;

  return (
    <form onSubmit={onSubmit} className={`align-start flex gap-4 ${className}`}>
      {children}
    </form>
  );
};
