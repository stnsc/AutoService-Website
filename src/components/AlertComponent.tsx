import { Alert } from "react-bootstrap";

interface Props {
  variant: string;
  contents: string;
  dismiss: () => void;
}

export default function AlertComponent({ variant, contents, dismiss }: Props) {
  return (
    <>
      <Alert variant={variant} onClose={dismiss} dismissible>
        <p>{contents}</p>
      </Alert>
    </>
  );
}
