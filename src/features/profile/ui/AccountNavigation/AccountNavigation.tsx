"use client";

import { useSession } from "next-auth/react";

import {
  artistsProfileRoutes,
  fansProfileArtistRoute,
  fansProfileRoutes,
} from "@/shared/constants";

import { NavBar } from "../NavBar/NavBar";
import style from "./AccountNavigation.module.scss";

export const AccountNavigation = ({ type }: { type?: "label" | "artist" }) => {
  const { data: session } = useSession();
  const artistRole = type ?? session?.user.profileType;

  const artistLinks = artistRole ? artistsProfileRoutes(artistRole) : fansProfileArtistRoute;

  return (
    <div className={style.navigation}>
      <NavBar links={fansProfileRoutes} title='Аккаунт' />
      <NavBar links={artistLinks} title='Кабинет' />
    </div>
  );
};
