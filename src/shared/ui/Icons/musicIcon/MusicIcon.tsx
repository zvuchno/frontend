import { SVGProps } from "react";

export const MusicIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="15" 
      height="14" 
      fill="none"
      className={className}
      {...props}
    >
      <path 
        fill="currentColor" 
        d="M5 0h10v13.333H8.333V6.667h5V3.333H6.667v10H0V6.667h5zm0 8.333H1.667v3.334H5zm8.333 0H10v3.334h3.333z"
      />
    </svg>
  )
}