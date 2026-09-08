interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const PlayIcon = ({ size = 24, ...props }: IconProps) => {
  return (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 28 28"
    width={size} 
    height={size}
    fill="none"
    {...props}
    >
      <path fill="#0046d3" fillRule="evenodd" d="M4.65 2.308a2.31 2.31 0 0 1 2.473-.048l16.269 9.737c.764.458 1.107 1.264 1.107 2.003s-.342 1.546-1.107 2.003L7.124 25.74c-.83.495-1.77.41-2.474-.048-.695-.452-1.15-1.253-1.15-2.176V4.484c0-.923.455-1.724 1.15-2.176m1.145 1.76c-.093.06-.195.196-.195.416v19.032c0 .22.102.356.195.416q.073.043.124.043c.03.001.07-.004.127-.038l16.268-9.736c.03-.019.085-.076.085-.2 0-.126-.055-.183-.085-.202L6.046 4.063a.23.23 0 0 0-.127-.038.25.25 0 0 0-.124.043" clipRule="evenodd"/>
    </svg>
  )
}