"use client";

import { Ref, forwardRef } from "react";
import { ChangeHandler } from "react-hook-form";

type Props = {
  name: string;
  onChange: ChangeHandler;
};

export const Input = forwardRef((props: Props, ref: Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      type="text"
      id="text"
      name={props.name}
      className="text-black"
      onInput={props.onChange}
    />
  );
});
