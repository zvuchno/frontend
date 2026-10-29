import { SVGProps } from "react";

export const NoteIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="17" 
      height="12" 
      fill="none"
      className={className}
      {...props}
    >
      <path 
        fill="currentColor" 
        d="M6.667 6.667h5V0h5v3.333h-3.334v8.334H6.667zm1.666 1.666V10h3.334V8.333zM0 10h5v1.667H0zm5-3.333H0v1.666h5zM0 3.333h10V5H0zM10 0H0v1.667h10z"
      />
    </svg>
  )
}