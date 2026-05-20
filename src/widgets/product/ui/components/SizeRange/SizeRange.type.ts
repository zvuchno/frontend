type TSize = {
  name: string,
  isAvailable: boolean,
};

export interface SizeRangeProps {
  sizes: TSize[];
  onClick: (size: string) => void;
};