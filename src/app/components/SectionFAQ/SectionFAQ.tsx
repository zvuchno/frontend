import { Title } from "@/shared/ui/Typography/Typography";
import { SectionFAQProps } from "./SectionFAQ.type";
import { CardFAQUI } from "@/shared/ui/cardFAQ/CardFAQ";
import s from "./SectionFAQ.module.scss";

const SectionFAQ = ({ title, items }: SectionFAQProps) => {
  return (
    <section className={s.section}>
      <Title className={s.title}>{title}</Title>
      <div className={s.content}>
        {items.map((item, index) => (
          <CardFAQUI key={index} containerClassName={s.cardFAQ} label={item.label}>{item.children}</CardFAQUI>
        ))}
      </div>
    </section>
  )
};

export default SectionFAQ;