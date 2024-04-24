"use client";

import { ChangeEvent, useState } from "react";

export const Input = () => {
  const [value, setValue] = useState("");

  return (
    <input
      type="text"
      value={value}
      name="text"
      className="text-black"
      onInput={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  );
};
