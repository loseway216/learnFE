import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
  // TODO: useRef不是很理解
  // https://btholt.github.io/complete-intro-to-react-v6/portals-and-refs
  const elRef = useRef(null);

  // initialize only one elRef
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    // 卸载 prevent memory leaks
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
