import { Text, Title } from "../Typography";
import s from "./VerifyLoader.module.scss";

interface VerifyLoaderProps {
  title: string;
  text: string;
};

export const VerifyLoader = ({ title, text }: VerifyLoaderProps) => {
  return (
    <div 
      className={s.container} 
      role="status" 
      aria-live="polite"
    >
      <Title Tag="h2" className={s.text}>
        {title}
      </Title>
      <Text Tag="p" className={s.text}>
        {text}
      </Text>
      <div className={s.loader} />
    </div>
  )
};