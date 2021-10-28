import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Icons, IconTypes } from "../../lib/font-awesome-icon/icons";
import styles from "./Modal.module.scss";

export const Modal: React.FC<{
  visible: boolean;
  onClose: () => void;
  form: JSX.Element;
}> = ({ visible, onClose, form }) => {
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  });

  if (!visible) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles["modal-inner"]}>
        <div className={styles["modal-header"]}>
          <h3 className={styles["modal-header__title"]}>Create task</h3>
          <button
            className={styles["modal-header__close"]}
            type="button"
            onClick={() => onClose()}
          >
            <FontAwesomeIcon
              className={styles["icon-close"]}
              icon={[IconTypes.solid, Icons.faTimes]}
            />
          </button>
        </div>
        <div className={styles["form-container"]}>{form}</div>
      </div>
    </div>,
    document.getElementById("root") as Element
  );
};
