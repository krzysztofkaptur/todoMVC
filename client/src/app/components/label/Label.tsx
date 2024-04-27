type Props = {
  id?: string;
  name: string;
  label: string;
  required?: boolean;
};

export const Label = (props: Props) => {
  const { id, name, label, required = false } = props;

  return <label htmlFor={id ?? name}>{required ? `${label}*` : label}</label>;
};
