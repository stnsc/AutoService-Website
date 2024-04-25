import { Alert } from "react-bootstrap";

/*
 * Componenta de Alterte
 *
 * Afiseaza in mod modular o alerta, care poate fi modificata in diverse moduri
 * Parametrul {variant} schimba aspectul altertei
 * Parametrul {contents} include text-ul
 * Parametrul {dismiss} inchide componenta
 * */

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
