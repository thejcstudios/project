import "./Modal.scss";

const Modal = ({ show, close, title, children }) => {
  return (
    <>
      <div className={`modalContainer ${show ? "show" : ""}`}>
        <div className="modalview">
          <header className="modal_header">
            <h2 className="modal_header-title">{title}</h2>
          </header>
          <main className="modal_content">{children}</main>
          <button className="raise" id="closeview" onClick={() => close()}>
            Cancel
          </button>
          <footer className="modal_footer"></footer>
        </div>
      </div>
    </>
  );
};

export default Modal;
