export type HeroUIProps = {
  mainTitle?: string;
  leftText?: {
    firstPart?: string;
    secondPart?: string;
  };
  rightText?: {
    firstPart?: string;
    secondPart?: string;
  };
  centerText?: string;
  className?: string
  children?: React.ReactElement;
};