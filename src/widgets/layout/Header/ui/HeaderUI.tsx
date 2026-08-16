"use client";

import { useState } from "react";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import SearchInput from "@/features/SearchInput/SearchInput";
import LogoutButton from "@/features/logoutButton/LogoutButton";
import { NavPanel } from "@/features/nav-panel";

import { useUserStore } from "@/entities/user/store/useUserStore";

import { CloseButtonIconCircledX } from "@/shared/ui/Icons";

import { type THeaderUIProps } from "../model/types";
import { HeaderActions } from "./HeaderActions";
import styles from "./header.module.scss";

export const HeaderUI = ({ actions, className }: THeaderUIProps) => {
  const user = useUserStore((state) => state.user);
  const isAuthorized = !!user?.id;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams}` : ""}`;

  const [isSearchOpen, setSearchOpen] = useState(false);

  const handleSearchClose = () => {
    setSearchOpen(false);
  };
  const userType = user?.isArtist ? "artist" : "listener";

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
              <HeaderActions
                actions={actions}
                onSearchOpen={setSearchOpen}
                isAuthorized={isAuthorized}
                userType={userType}
              />
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
