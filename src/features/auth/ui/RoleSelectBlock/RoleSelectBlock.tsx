import s from './RoleSelectBlock.module.scss';
import { RoleSelectBlockProps } from './RoleSelectBlock.type';

const RoleSelectBlock = ({ children, renderTitle, renderText }: RoleSelectBlockProps) => {
  return (
    <div className={s.container}>
      <div className={s.container__title}>{renderTitle?.()}</div>
      <div className={s.container__cards}>
        {children}
      </div>
      <div className={s.container__text}>{renderText?.()}</div>
    </div>
  )
};

export default RoleSelectBlock;