"use client";

import { useSession } from "next-auth/react";

import {
  artistsProfileRoutes,
  fansProfileArtistRoute,
  fansProfileRoutes,
} from "@/shared/constants";

import { NavBar } from "../NavBar/NavBar";
import style from "./AccountNavigation.module.scss";

export const AccountNavigation = () => {
  const { data, status } = useSession();
  const isArtist = data?.user.isArtist ?? false;
  const artistRole = data?.user.profileType;

  const fanLinks = fansProfileRoutes;
  const artistLinks =
    !isArtist || !artistRole ? fansProfileArtistRoute : artistsProfileRoutes(artistRole);

  if (status !== "loading")
    return (
      <div className={style.navigation}>
        <NavBar links={fanLinks} title='Аккаунт' />
        <NavBar links={artistLinks} title='Кабинет' />
      </div>
    );
};
