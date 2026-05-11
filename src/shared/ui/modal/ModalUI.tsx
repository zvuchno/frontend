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
    if (!isOpen) return;
    const handleEsc = useCallback((e: KeyboardEvent) => {
      e.key === 'Escape' && onClose();
    }, [onClose]);

    useEffect(() => {
      if(isOpen) {
      document.addEventListener('keydown', handleEsc);
      }
        
      return () => {
        document.removeEventListener('keydown', handleEsc);
      }
    }, [isOpen, handleEsc]);
    
    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <button className={styles.modalCloseButton} onClick={onClose}>
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