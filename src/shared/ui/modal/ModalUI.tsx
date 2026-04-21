import { FC, useCallback, useEffect } from 'react';
import styles from './modal.module.scss';
import { TModalUIProps } from './types'
import { CloseButtonIconX } from '../icons/closeButtonIconX';
import { CloseButtonIconCircledX } from '../icons/closeButtonIconCircledX';


export const ModalUI: FC<TModalUIProps>  = (
  {
    closeButtonStyle = 'circledX',
    children,
    isOpen = false,
    onClose
  }) => {
    const handleEsc = useCallback((e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }, [onClose]);

    useEffect(() => {
      if (isOpen) {
        document.addEventListener('keydown', handleEsc);
      }

      return () => {
        document.removeEventListener('keydown', handleEsc);
      }
    }, [isOpen, handleEsc]);

    useEffect(() => {
      if (!isOpen) {
        return;
      }

      const { body } = document;
      const previousOverflow = body.style.overflow;

      body.style.overflow = 'hidden';

      return () => {
        body.style.overflow = previousOverflow;
      };
    }, [isOpen]);

    if (!isOpen) {
      return null;
    }
    
    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className={styles.modalCloseButton}
            onClick={onClose}
          >
            {closeButtonStyle === 'circledX' 
              ? <CloseButtonIconCircledX /> 
              : <CloseButtonIconX />
            }
          </button>
          <div className={styles.modalContent}>
            {children}
          </div>
        </div>
      </div>
    )
  }
