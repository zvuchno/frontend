import { Title, CardFAQUI } from "@/shared/ui";
import { SectionFAQProps } from "../model/SectionFAQ.type";
import s from "./SectionFAQ.module.scss";

export const SectionFAQ = ({ title, items }: SectionFAQProps) => {
  return (
    <section className={s.section}>
      <Title className={s.title}>{title}</Title>
      <div className={s.content}>
        {items.map((item, index) => (
          <CardFAQUI
            key={index}
            containerClassName={s.cardFAQ}
            label={item.label}
          >
            {item.children}
          </CardFAQUI>
        ))}
      </div>
    </section>
  );
};
