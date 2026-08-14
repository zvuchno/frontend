import { AccentContainer } from "@/shared/ui";
import { ComponentPropsWithoutRef } from "react";
import s from "./AccentContainerWithPlayer.module.scss";
import { PlayerUI } from "@/features/player";

export type PlayerContainerProps = ComponentPropsWithoutRef<"div">;

export const AccentContainerWithPlayer = ({ ...props }: PlayerContainerProps) => {
  return (
    <div className={s.container}>
      <AccentContainer { ...props }/>
      <PlayerUI className={s.player} />
    </div>
  )
};