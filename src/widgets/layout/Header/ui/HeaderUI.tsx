"use client";

import { THeaderUIProps } from "../model/types";
import styles from "./header.module.scss";
import { FC, useState } from "react";
import Link from "next/link";
import { NavPanel } from "@/features";
import clsx from "clsx";
import SearchInput from "@/features/SearchInput/SearchInput";
import { CloseButtonIconCircledX } from "@/shared/ui/Icons";
import Image from "next/image";
import LogoutButton from "@/features/logoutButton/LogoutButton";
import { useUserStore } from "@/entities/user/store/useUserStore";

export const HeaderUI: FC<THeaderUIProps> = ({ actions, className }) => {
  const user = useUserStore((state) => state.user);
  const isAuthorized = !!user?.id;

  const [isSearchOpen, setSearchOpen] = useState(false);

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  return (
    <header
      className={clsx(
        styles.header,
        isSearchOpen && styles.headerSearch,
        className,
      )}
    >
      {isSearchOpen ? (
        <div className={styles.headerSearchElement}>
          <SearchInput className={styles.headerSearchInput} />
          <button
            className={styles.headerSearchCloseButton}
            type="button"
            title="Закрыть"
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
            <Image
              src="/icons/logo.svg"
              alt="Логотип ЗВУЧНО"
              width={135}
              height={32}
            />
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
                    ? isAuthorized
                      ? user?.isArtist
                        ? "/artisis/profile"
                        : "/fans/profile"
                      : "/role"
                    : action.href;

                return (
                  <li
                    key={action.title}
                    className={styles.headerAction}
                    aria-label={action.title}
                  >
                    {action.type === "button" && (
                      <button
                        type="button"
                        title={action.title}
                        disabled={false}
                        aria-disabled={false}
                        onClick={handleActionClick}
                      >
                        {action.children}
                      </button>
                    )}
                    {action.type === "link" && action.href && (
                      <Link
                        title={action.title}
                        href={href ?? action.href}
                        prefetch={false}
                      >
                        {action.children}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            {isAuthorized && <LogoutButton />}
          </nav>
        </>
      )}
    </header>
  );
};
