"use client";

import { useState } from "react";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import SearchInput from "@/features/SearchInput/SearchInput";
import LogoutButton from "@/features/logoutButton/LogoutButton";
import { NavPanel } from "@/features/nav-panel";

import { useCart } from "@/entities/cart";
import { useUserStore } from "@/entities/user/store/useUserStore";

import { HeaderCartWithCounter } from "@/shared/ui/CartCounter/HeaderCartWithCounter";
import { CloseButtonIconCircledX } from "@/shared/ui/Icons";

import { type THeaderUIProps } from "../model/types";
import styles from "./header.module.scss";

export const HeaderUI = ({ actions, className }: THeaderUIProps) => {
  const user = useUserStore((state) => state.user);
  const isAuthorized = !!user?.id;

  const { data } = useCart();
  const itemsCount = data?.items?.length ?? 0;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams}` : ""}`;

  const [isSearchOpen, setSearchOpen] = useState(false);

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  return (
    <header className={clsx(styles.header, isSearchOpen && styles.headerSearch, className)}>
      {isSearchOpen ? (
        <div className={styles.headerSearchElement}>
          <SearchInput className={styles.headerSearchInput} />
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
          <Link href={"/"} className={styles.headerTitle} prefetch={false}>
            <Image src='/icons/logo.svg' alt='Логотип ЗВУЧНО' width={135} height={32} />
          </Link>
          <NavPanel className={styles.headerMenu} />

          <nav className={styles.headerActions}>
            <ul className={styles.headerActionsMenu}>
              {actions.map((action) => {
                const handleActionClick = () => {
                  if (action.title === "Поиск") {
                    handleSearchOpen();
                  }
                };

                const href =
                  action.title === "Профиль"
                    ? user?.isArtist
                      ? "/artisis/profile"
                      : "/fans/profile"
                    : action.href;

                if (action.title === "Профиль" && !isAuthorized) {
                  return null;
                }

                return (
                  <li key={action.title} className={styles.headerAction} aria-label={action.title}>
                    {action.type === "button" && (
                      <button
                        type='button'
                        title={action.title}
                        disabled={false}
                        aria-disabled={false}
                        onClick={handleActionClick}
                      >
                        {action.children}
                      </button>
                    )}
                    {action.type === "link" && action.href && (
                      <Link title={action.title} href={href ?? action.href} prefetch={false}>
                        {action.title === "Корзина" ? (
                          <HeaderCartWithCounter items={itemsCount} />
                        ) : (
                          action.children
                        )}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            {!isAuthorized && (
              <Link href={`/signin?next=${encodeURIComponent(currentUrl)}`} aria-label='Вход'>
                Войти
              </Link>
            )}
            {isAuthorized && <LogoutButton />}
          </nav>
        </>
      )}
    </header>
  );
};
