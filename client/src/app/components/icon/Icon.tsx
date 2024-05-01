import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  icon: any;
};

export const Icon = (props: Props) => {
  const { icon } = props;

  return <FontAwesomeIcon icon={icon} />;
};
