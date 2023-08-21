import ReactModal from "react-modal";

ReactModal.setAppElement("*");

const Modal = ({ isOpen, onRequestClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="modal-overlay"
      className="modal-content"
      appElement={document.getElementById("app")}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
