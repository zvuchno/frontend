"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";

import s from "./FieldErrorMessage.module.scss";

export const FieldErrorMessage = ({
  message,
  hasError,
}: {
  message: string;
  hasError?: boolean;
}) => {
  const path = usePathname();
  const isSignInSignUpForm = path.includes("signin") || path.includes("signup");

  return (
    <span
      className={clsx(s.message, { [s.smallSize]: isSignInSignUpForm }, { [s.error]: hasError })}
    >
      {message}
    </span>
  );
};
