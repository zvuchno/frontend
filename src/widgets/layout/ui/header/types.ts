import { Url } from 'next/dist/shared/lib/router/router'

export type THeaderAction = {
  title: string,
  type: 'link' | 'button',
  children?: React.ReactNode,
  style?: React.CSSProperties,
  className?: string,
  href?: Url, 
}

export interface THeaderUIProps {
  actions: THeaderAction[],
  className?: string,
  style?: React.CSSProperties
}