import { Alert } from "react-bootstrap";
import { useEffect, useState } from "react";

/*
 * Componenta de Alterte
 *
 * Afiseaza in mod modular o alerta, care poate fi modificata in diverse moduri
 * Parametrul {variant} schimba aspectul altertei
 * Parametrul {contents} include text-ul
 * Parametrul {dismiss} inchide componenta
 * */

interface Props {
  contents: string;
  dismiss: () => void;
}

export default function AlertComponent({ contents, dismiss }: Props) {
  const [variantType, setVariantType] = useState("primary");

  useEffect(() => {
    const err_keywords = ["nu", "incorect", "deja"];
    const setVariant = (contents: string | string[]) => {
      if (err_keywords.some((keyword) => contents.includes(keyword))) {
        setVariantType("danger");
      }
    };

    return setVariant(contents);
  }, [contents]);

  return (
    <>
      <Alert
        className="m-2"
        variant={variantType}
        onClose={dismiss}
        dismissible
      >
        <p>{contents}</p>
      </Alert>
    </>
  );
}
