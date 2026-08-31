import clsx from "clsx";

import { ArtistDescription } from "@/widgets/ArtistDescription";

import { CardArtist } from "@/entities/Artist";

import { AccentContainer, Title } from "@/shared/ui";
import { matchSocialNetwork } from "@/shared/utils/matchSocialNetwork";

import { type IArtistDetailCardProps } from "../model/ArtistDetailCard.types";
import s from "./ArtistDatailCard.module.scss";

export const ArtistDetailCard = ({ artist }: IArtistDetailCardProps) => {
  console.log(artist.socials);
  return (
    <AccentContainer className={s.containerWrapper}>
      <div className={s.container}>
        <CardArtist
          image={artist.cover ?? undefined}
          className={clsx(s.withoutHover, s.wideWidth)}
        />

        <div className={s.info}>
          <div className={s.info__header}>
            <Title Tag='h2' className={clsx(s.text, s.info__title)}>
              {artist.name}
            </Title>
            {artist.city && <p className={clsx(s.text, s.info__subtitle)}>{artist.city}</p>}
          </div>

          {artist.description && (
            <ArtistDescription
              variant='catalog'
              description={artist.description}
              hasChanges={() => {}}
              onEditMode={() => {}}
              className={s.noEditedDescription}
            />
          )}

          {(artist.contacts.length > 0 || artist.socials.length > 0) && (
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
                  {artist.socials.map((social) => {
                    const socialIcon = matchSocialNetwork(social.value);
                    return (
                      <>
                        <a
                          className={s.socials__link}
                          key={social.id}
                          href={social.value}
                          target='_blank'
                          rel='noopener noreferrer'
                          title={social.label}
                          style={{
                            
                            backgroundImage: socialIcon,
                          }}
                        />
                      </>
                    );
                  })}
                </div>
              )}
              <div></div>
            </div>
          )}
        </div>
      </div>
    </AccentContainer>
  );
};
