import { type CSSProperties } from "react";

import s from "./Loader.module.scss";

export const Loader = (style?: CSSProperties) => {
  return (
    <div className={s.container} role='status' aria-live='polite' style={style}>
      <div className={s.loader} />
    </div>
  );
};
