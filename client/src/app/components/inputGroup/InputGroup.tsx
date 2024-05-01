import { HTMLInputTypeAttribute, Ref, forwardRef } from "react";

import { Label } from "@/app/components/label";
import { Input } from "@/app/components/ui/input";

type Props = {
  id?: string;
  name: string;
  label?: string;
  error?: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
};

export const InputGroup = forwardRef(
  (props: Props, ref: Ref<HTMLInputElement>) => {
    const { id, name, label, type, error, required = false, ...rest } = props;

    return (
      <div className="flex w-full flex-col">
        {label && <Label name={name} label={label} required={required} />}
        <Input id={id ?? name} name={name} ref={ref} type={type} {...rest} />
        {error && <span>{error}</span>}
      </div>
    );
  },
);
