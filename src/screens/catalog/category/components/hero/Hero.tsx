import clsx from "clsx";
import Image from "next/image";

import { Title } from "@/shared/ui";

import s from "./Hero.module.scss";

const Hero = () => {
  return (
    <div className={s.container}>
      <Image
        className={s.back}
        src={"/images/image_catalog_hero.png"}
        alt='Фоновое изображение прозрачной пленки'
        fill
        priority
      />
      <Image
        src={"/images/vinyl_player.png"}
        alt='Виниловый проигрыватель'
        className={clsx(s.img, s.img_left)}
        width={506}
        height={495}
        priority
      />
      <Image
        src={"/images/vinyl_player.png"}
        alt='Виниловый проигрыватель'
        className={clsx(s.img, s.img_right)}
        width={506}
        height={495}
        priority
      />
      <Title Tag='h1' className={s.title}>
        Каталог
      </Title>
    </div>
  );
};

export default Hero;
