export interface TModalUIProps {
  closeButtonStyle: 'x' | 'circledX';
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}