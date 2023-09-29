import { useState, useEffect } from "react";
import { Toast, ToastHeader, ToastBody } from "reactstrap";

export default function ToastSuccess({ isToastOpen, text, fail }) {
  const [close, setClose] = useState(true);

  useEffect(() => {
    if (isToastOpen) {
      setClose(true);
      const timer = setTimeout(() => {
        setClose(false);
      }, 1000 * 8);
      return () => clearTimeout(timer);
    }
  }, [isToastOpen]);

  const handleClose = () => {
    setClose(false);
  };

  return (
    <div className={`fixed bottom-0 ${fail ? 'right-0' : 'left-0'}`}>
      <Toast isOpen={close && isToastOpen}>
        <ToastHeader className="flex items-center text-center">
          {fail || 'Sucesso!'}
          <button
            type="button"
            data-bs-dismiss="toast"
            aria-label="Close"
            className="absolute right-1"
            onClick={handleClose}
          >
            <img src="/close.svg" alt="" title="close" />
          </button>
        </ToastHeader>
        <ToastBody className="text-base flex gap-2 items-center">
          <img src={fail ? "/fail.svg" : "/success.svg"} alt={text} title={fail || "sucesso"} className="w-10" />
          {text}
        </ToastBody>
      </Toast>
    </div>
  );
}
