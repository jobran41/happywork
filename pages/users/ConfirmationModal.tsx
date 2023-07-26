import { useState } from 'react';

const ConfirmationModal = ({ show, onConfirm, onCancel, title, message }) => {
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = async () => {
    setConfirming(true);
    await onConfirm();
    setConfirming(false);
  };

  return (
    <div className={`modal ${show ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={onCancel}></button>
        </header>
        <section className="modal-card-body">
          <p>{message}</p>
        </section>
        <footer className="modal-card-foot">
          <button
            className={`button is-danger ${confirming ? 'is-loading' : ''}`}
            onClick={handleConfirm}
            disabled={confirming}
          >
            Confirm
          </button>
          <button className="button" onClick={onCancel} disabled={confirming}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ConfirmationModal;
