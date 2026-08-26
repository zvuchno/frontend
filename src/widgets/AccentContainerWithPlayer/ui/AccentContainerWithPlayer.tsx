import { type ComponentPropsWithoutRef } from "react";

import { PlayerUI } from "@/features/player";

import { AccentContainer } from "@/shared/ui";

import s from "./AccentContainerWithPlayer.module.scss";

export type PlayerContainerProps = ComponentPropsWithoutRef<"div">;

export const AccentContainerWithPlayer = ({ ...props }: PlayerContainerProps) => {
  return (
    <div className={s.container}>
      <AccentContainer {...props} />
      <PlayerUI className={s.player} />
    </div>
  );
};
