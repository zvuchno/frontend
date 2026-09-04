"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";

import s from "./FieldErrorMessage.module.scss";

export const FieldErrorMessage = ({
  message,
  hasError,
  size = "large",
}: {
  message: string;
  hasError?: boolean;
  size?: "small" | "large";
}) => {
  const path = usePathname();
  const isSignInSignUpForm = path.includes("signin") || path.includes("signup") || path.includes("reset-password");

  return (
    <span
      className={clsx(s.message, { [s.smallSize]: isSignInSignUpForm || size === "small" }, { [s.error]: hasError })}
    >
      {message}
    </span>
  );
};
