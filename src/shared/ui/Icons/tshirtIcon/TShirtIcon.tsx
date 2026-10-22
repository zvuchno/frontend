import { SVGProps } from "react"

export const TShirtIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="17" 
    height="15" 
    fill="none"
    className={className}
    {...props}
    >
      <path fill="currentColor" d="M1.667 0h5v1.667h-5zM0 0h1.667v6.667H0zm1.667 5H5v1.667H1.667z"/>
      <path fill="currentColor" d="M3.334 5H5v8.333H3.334zm0 8.333h10V15h-10zM11.667 5h1.667v8.333h-1.667z"/>
      <path fill="currentColor" d="M11.667 5H15v1.667h-3.333zM15 0h1.667v6.667H15zm-5 0h5v1.667h-5zM5 1.667h6.667v1.666H5z"/>
    </svg>
  )
}