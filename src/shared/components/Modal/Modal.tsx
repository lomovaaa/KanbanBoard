import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

library.add(faTimes);

export const Modal: React.FC<{
  visible: boolean;
  onClose: () => void;
  form: JSX.Element;
}> = ({ visible, onClose, form }) => {
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  if (!visible) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-inner">
        <div className="modal-header">
          <h3 className="modal-header__title">Create task</h3>
          <button className="modal-header__close" type="button" onClick={() => onClose()}>
            <FontAwesomeIcon className="icon-close" icon={['fas', 'times']} />
          </button>
        </div>
        <div className="form-container">{form}</div>
      </div>
    </div>,
    document.getElementById('root') as Element
  );
};
