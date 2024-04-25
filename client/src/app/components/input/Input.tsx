"use client";

import { Ref, forwardRef } from "react";
import { ChangeHandler } from "react-hook-form";

type Props = {
  name: string;
  onChange: ChangeHandler;
  error: any;
};

export const Input = forwardRef((props: Props, ref: Ref<HTMLInputElement>) => {
  const { name, error, onChange } = props;

  return (
    <div className="flex flex-col">
      <input
        ref={ref}
        type="text"
        id="text"
        name={name}
        className="text-black"
        onInput={onChange}
      />
      {error && <span>{error}</span>}
    </div>
  );
});
