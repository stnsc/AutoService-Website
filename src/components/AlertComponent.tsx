import { Alert } from "react-bootstrap";
import { useEffect, useState } from "react";

interface Props {
  variant: string;
  heading: string;
  contents: string;
  show_bool: boolean;
}

export default function AlertComponent({
  variant,
  heading,
  contents,
  show_bool,
}: Props) {
  const [show, setShow] = useState(show_bool);

  useEffect(() => {
    setShow(show_bool);
  }, [show_bool]);

  if (show) {
    return (
      <>
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{heading}</Alert.Heading>
          <p>{contents}</p>
        </Alert>
      </>
    );
  } else {
    return null;
  }
}
