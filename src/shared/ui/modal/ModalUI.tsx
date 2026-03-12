import { FC } from 'react';
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
    
    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <button className={styles.modalCloseButton} onClick={onClose}>
            {closeButtonStyle === 'circledX' 
              ? <CloseButtonIconCircledX /> 
              : <CloseButtonIconX />
            }
          </button>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      </div>
    )
  }