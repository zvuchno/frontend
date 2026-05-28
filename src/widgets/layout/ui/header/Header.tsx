'use client'

import { THeaderUIProps } from './types'
import styles from './header.module.scss'
import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { NavPanel } from '@/features'
import clsx from 'clsx'
import SearchInput from '@/features/SearchInput/SearchInput'
import { CloseButtonIconCircledX } from '@/shared/ui/icons/closeButtonIconCircledX'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { ButtonUI } from '@/shared/ui/button'
import { ModalUI } from '@/shared/ui/modal'


export const HeaderUI: FC<THeaderUIProps> = ({
  actions,
  className
}) => {
  const { data: session, status } = useSession();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  const [isSearchOpen, setSearchOpen] = useState(false)

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    if (status === 'authenticated') {
      setIsAuthorized(true)

    } else if (status === 'unauthenticated') {
      setIsAuthorized(false)
    }

  }, [status]);
  
  const handleSearchOpen = () => {
    setSearchOpen(true)
  }

  const handleSearchClose = () => {
    setSearchOpen(false)
  }

  const handleConfirmModalOpen = () => {
    setError(null);
    setIsConfirmModalOpen(true);
  };

  const handleLogOut = async () => {
    setIsLoading(true);

    try {
      await signOut({
        redirect: true,
        callbackUrl: '/'
      });

      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error('Ошибка выхода:', error);
      setError('Не удалось выйти из аккаунта. Попробуйте снова')

    } finally {
      setIsLoading(false)
    }
  };

  return(
    <header className={clsx(
      styles.header, 
      isSearchOpen && styles.headerSearch,
      className
    )}>
      {isSearchOpen ? (
        <div className={styles.headerSearchElement}>
          <SearchInput
            className={styles.headerSearchInput}
          />
          <button 
            className={styles.headerSearchCloseButton}
            type='button'
            title='Закрыть' 
            disabled={false}
            aria-disabled={false}
            onClick={handleSearchClose}
          >
            <CloseButtonIconCircledX />
          </button>
        </div>
      ) : (
        <>
          <Link href={'/'} className={styles.headerTitle}>
            <Image 
              src='/logo.svg' 
              alt='Логотип ЗВУЧНО'
              width={135}
              height={32}/>
          </Link>
          <NavPanel className={styles.headerMenu}/>
          <nav className={styles.headerActions}>
            <ul className={styles.headerActionsMenu}>
              {actions.map((action) => {
                const handleActionClick = () => {
                  if (action.title === 'Поиск') {
                    handleSearchOpen();
                  }
                };

                const href = action.title === 'Профиль' 
                  ? isAuthorized
                    ? session?.user.isArtist
                      ? "/artisis/profile"
                      : "/fans/profile"
                    : "/role"
                  : action.href

                return (
                  <li 
                    key={action.title}
                    className={styles.headerAction} 
                    aria-label={action.title}>
                      {action.type === 'button' && 
                        <button
                          type='button'
                          title={action.title} 
                          disabled={false}
                          aria-disabled={false}
                          onClick={handleActionClick}
                        >
                          {action.children}
                        </button>
                      }
                      {action.type === 'link' && action.href && 
                        <Link
                          title={action.title} 
                          href={href ?? action.href}
                        >
                          {action.children}
                        </Link>
                      }
                  </li>
                )
              })}
            </ul>
            {isAuthorized && (
              <ButtonUI 
                variant='secondary' 
                onClick={handleConfirmModalOpen}
                size='small'
              >
                Выйти
              </ButtonUI>
            )}
          </nav>
         
          <ModalUI 
            isOpen={isConfirmModalOpen} 
            onClose={() => setIsConfirmModalOpen(false)} 
            closeButtonStyle='circledX'
          >
            <div className={styles.confirmModal}>
              <p className={styles.confirmModal__text}>{error ? 'error' : 'Вы уверены, что хотите выйти?'}</p>
              <ButtonUI 
                variant='primary' 
                className={styles.confirmModal__button} 
                size='small' 
                onClick={handleLogOut}
                disabled={isLoading}
              >
                {isLoading ? 'Выход...' : 'Выйти'}
              </ButtonUI>
            </div>
          </ModalUI>
        </>
      )}
    </header>
  )
}