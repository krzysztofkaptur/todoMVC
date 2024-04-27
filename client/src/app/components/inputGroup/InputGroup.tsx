import { HTMLInputTypeAttribute, Ref, forwardRef } from "react";

import { Label } from "@/app/components/label";
import { Input } from "@/app/components/input";

type Props = {
  name: string;
  label?: string;
  error?: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
};

export const InputGroup = forwardRef(
  (props: Props, ref: Ref<HTMLInputElement>) => {
    const { name, label, type, error, required = false, ...rest } = props;

    return (
      <div className="flex flex-col">
        {label && <Label name={name} label={label} required={required} />}
        <Input name={name} ref={ref} type={type} {...rest} />
        {error && <span>{error}</span>}
      </div>
    );
  },
);
