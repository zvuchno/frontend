export interface ListSectionProps {
  title: string;
  link: string;
  children: React.ReactNode;
  hasMore?: boolean;
  gap?: string;
  className?: string
};