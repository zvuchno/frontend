import { type ReactNode } from "react";

export const MenuIcon = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={className}>{children}</div>;
};
