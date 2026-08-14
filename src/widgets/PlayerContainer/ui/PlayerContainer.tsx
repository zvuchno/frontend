import { AccentContainer } from "@/shared/ui";
import { ComponentPropsWithoutRef } from "react";
import s from "./PlayerContainer.module.scss";
import { PlayerUI } from "@/features/player";

export type PlayerContainerProps = ComponentPropsWithoutRef<"div">;

export const PlayerContainer = ({ ...props }: PlayerContainerProps) => {
  return (
    <div className={s.container}>
      <AccentContainer { ...props }/>
      <PlayerUI className={s.player} />
    </div>
  )
};