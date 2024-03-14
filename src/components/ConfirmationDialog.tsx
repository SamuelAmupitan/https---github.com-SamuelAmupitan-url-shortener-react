import React from 'react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-dialog">
      <p>Are you sure you want to remove the short URL?</p>
  <button onClick={onClose} className='cancel'>Cancel</button>
      <button onClick={onConfirm} className='confirm'>Confirm</button>
    </div>
  );
};

export default ConfirmationDialog;
