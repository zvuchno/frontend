import clsx from "clsx";

import { AccentContainerWithPlayer } from "@/widgets/AccentContainerWithPlayer";
import { ArtistDescription } from "@/widgets/ArtistDescription";

import { CardArtist } from "@/entities/Artist";

import { Title } from "@/shared/ui";

import { type IArtistDetailCardProps } from "../model/ArtistDetailCard.types";
import s from "./ArtistDatailCard.module.scss";

export const ArtistDetailCard = ({ artist }: IArtistDetailCardProps) => {
  return (
    <AccentContainerWithPlayer className={s.containerWrapper}>
      <div className={s.container}>
        <CardArtist image={artist.cover ?? undefined} className={s.withoutHover} />

        <div className={s.info}>
          <div className={s.info__header}>
            <Title Tag='h2' className={clsx(s.text, s.info__title)}>
              {artist.name}
            </Title>
            <p className={clsx(s.text, s.info__subtitle)}>{artist.city}</p>
          </div>

          <ArtistDescription variant='catalog' description={artist.description} />

          <div className={s.info__contacts}>
            {artist.contacts.length > 0 &&
              artist.contacts.map((contact) => (
                <div key={contact.id} className={s.contacts}>
                  <p className={clsx(s.text, s.contacts__label)}>{contact.label}</p>
                  <p className={clsx(s.text, s.contacts__value)}>{contact.value}</p>
                </div>
              ))}
            {artist.socials.length > 0 && (
              <div className={s.socials}>
                {artist.socials.map((social) => (
                  <a
                    className={s.socials__link}
                    key={social.id}
                    href={social.value}
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{
                      backgroundImage:
                        social.label === "Вконтакте"
                          ? 'url("/icons/vk-icon.svg")'
                          : social.label === "YouTube"
                            ? 'url("/icons/YouTube-icon.svg")'
                            : social.label === "Telegram"
                              ? 'url("/icons/tg-icon.svg")'
                              : "",
                    }}
                  />
                ))}
              </div>
            )}
            <div></div>
          </div>
        </div>
      </div>
    </AccentContainerWithPlayer>
  );
};
