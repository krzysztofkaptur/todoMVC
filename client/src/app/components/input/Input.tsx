"use client";

import { HTMLInputTypeAttribute, Ref, forwardRef } from "react";
import { ChangeHandler } from "react-hook-form";

type Props = {
  id?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  onChange?: ChangeHandler;
};

export const Input = forwardRef((props: Props, ref?: Ref<HTMLInputElement>) => {
  const { id, name, type = "text", onChange } = props;

  return (
    <input
      ref={ref}
      id={id ?? name}
      name={name ?? id}
      className="text-black"
      type={type}
      onInput={onChange}
    />
  );
});
