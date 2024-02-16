import { FC, PropsWithChildren } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({ isOpen, onClose, children }) => {

  if (!isOpen) {
    return null
  };

  return (
    <div
      style={{ position: 'fixed', top: '20%', left: '30%', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}
    >
      <button onClick={onClose}>Close</button>
      {children}
    </div>
  );
};
