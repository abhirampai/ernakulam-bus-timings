import reactDom from "react-dom";
const Modal = ({ open, children, onCloseHandler }) => {
  if (!open) return null;
  return reactDom.createPortal(
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center w-full h-full mx-auto overflow-hidden bg-transparent rounded animated fadeIn faster">
          <div
            onClick={() => onCloseHandler(false)}
            className="fixed inset-0 flex items-center justify-center w-full animated fadeIn faster"
            style={{
              backgroundColor: "rgba(27, 31, 35, 0.867)",
              backdropFilter: "blur(2px)",
            }}
          ></div>
          {children}
        </div>
      )}
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
