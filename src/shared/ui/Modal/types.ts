export interface TModalUIProps {
  closeButtonStyle: "x" | "circledX";
  children: React.ReactNode;
  isOpen: boolean;
  hasClickOnOverlay?: boolean;
  onClose: () => void;
  className?: string;
}
