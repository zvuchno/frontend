import { Title } from "@/shared/ui";
import s from "./Hero.module.scss";
import clsx from "clsx";

const Hero = () => {
  return (
    <div className={s.container}>
      <div className={s.back} />
      <img
        src={"/images/vinyl_player.png"}
        alt="Виниловый проигрыватель"
        className={clsx(s.img, s.img_left)}
        loading="lazy"
      />
      <img
        src={"/images/vinyl_player.png"}
        alt="Виниловый проигрыватель"
        className={clsx(s.img, s.img_right)}
        loading="lazy"
      />
      <Title Tag="h1" className={s.title}>
        Каталог
      </Title>
    </div>
  );
};

export default Hero;
