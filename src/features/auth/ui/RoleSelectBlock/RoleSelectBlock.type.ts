import { ReactNode } from "react";

export interface RoleSelectBlockProps {
  children: ReactNode;
  renderTitle?: () => ReactNode;
  renderText?: () => ReactNode;
};