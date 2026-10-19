import { SVGProps } from "react";

export const MicrophoneIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="14" 
      height="17" 
      fill="none"
      className={className}
      {...props}
    >
      <path 
        fill="currentColor" 
        d="M5 0h3.333v1.667H5zM3.333 1.667H5V10H3.333zM5 10h3.333v1.667H5zm3.333-8.333H10V10H8.333zM0 6.667h1.667v5H0zm1.667 5h1.666v1.666H1.667zm1.666 1.666H10V15H3.333zM10 11.667h1.667v1.666H10zm1.667-5h1.666v5h-1.666zM5.833 15H7.5v1.667H5.833z"
      />
    </svg>
  )
}