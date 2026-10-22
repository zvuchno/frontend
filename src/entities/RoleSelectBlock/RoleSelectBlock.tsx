import s from "./RoleSelectBlock.module.scss";
import { type RoleSelectBlockProps } from "./RoleSelectBlock.type";

export const RoleSelectBlock = ({ children, renderTitle, renderText }: RoleSelectBlockProps) => {
  return (
    <div className={s.container}>
      {renderTitle && <div className={s.container__title}>{renderTitle?.()}</div>}
      <div className={s.container__cards}>{children}</div>
      {renderText && <div className={s.container__text}>{renderText?.()}</div>}
    </div>
  );
};
