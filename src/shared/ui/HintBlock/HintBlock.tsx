import s from "./HintBlock.module.scss";

export const HintBlock = ({ text }: { text: string }) => {
  return (
    <span className={s.icon}>
      <span className={s.popup}>
        {text}
      </span>
    </span>
  )
};