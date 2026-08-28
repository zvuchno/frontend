"use client";

import { useCallback, useEffect } from "react";

import { CloseButtonIconCircledX } from "../Icons/closeButtonIconCircledX";
import { CloseButtonIconX } from "../Icons/closeButtonIconX";
import styles from "./modal.module.scss";
import { type TModalUIProps } from "./types";

export const ModalUI = ({
  closeButtonStyle = "circledX",
  children,
  isOpen = false,
  hasClickOnOverlay = true,
  onClose,
}: TModalUIProps) => {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, handleEsc]);

  // блокировка скролла body
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const root = document.documentElement;
    const body = document.body;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousRootOverflow = root.style.overflow;
    const previousBodyStyles = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyStyles.overflow;
      body.style.paddingRight = previousBodyStyles.paddingRight;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={hasClickOnOverlay ? onClose : undefined}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type='button' className={styles.modalCloseButton} onClick={onClose}>
          {closeButtonStyle === "circledX" ? <CloseButtonIconCircledX /> : <CloseButtonIconX />}
        </button>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
};
