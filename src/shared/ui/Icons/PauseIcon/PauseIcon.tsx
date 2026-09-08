interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const PauseIcon = ({ size = 24, ...props }: IconProps) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24"
      width={size} 
      height={size} 
      fill="none" 
      stroke="#0046d3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2"
      {...props}
    >
      <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
    </svg>
  )
}