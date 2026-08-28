import {
  artistsProfileRoutes,
  fansProfileArtistRoute,
  fansProfileRoutes,
} from "@/shared/constants";

import { NavBar } from "../NavBar/NavBar";
import style from "./AccountNavigation.module.scss";

export const AccountNavigation = ({ type }: { type?: "label" | "artist" }) => {
  const isArtist = !!type;
  const artistRole = type;

  const artistLinks =
    !isArtist || !artistRole ? fansProfileArtistRoute : artistsProfileRoutes(artistRole);

  return (
    <div className={style.navigation}>
      <NavBar links={fansProfileRoutes} title='Аккаунт' />
      <NavBar links={artistLinks} title='Кабинет' />
    </div>
  );
};
