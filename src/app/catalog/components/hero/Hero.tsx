import { Title } from "@/shared/ui/Typography/Typography";
import s from "./Hero.module.scss";
import clsx from "clsx";

const Hero = () => {
  return (
    <div className={s.container}>
      <div className={s.back} />
      <img src={'/recordPlayer.png'} className={clsx(s.img, s.img_left)} />
      <img src={'/recordPlayer.png'} className={clsx(s.img, s.img_right)} />
      <Title Tag="h1" className={s.title}>Каталог</Title>
    </div>
  )
};

export default Hero;