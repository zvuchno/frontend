import { Text, Title } from "@/shared/ui/Typography/Typography";
import { JoinSectionProps } from "./JoinSection.type";
import { Link } from "@/shared/ui/Link/Link";
import s from "./JoinSection.module.scss";

const joinIcon: React.ReactNode = (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none">
    <path fill="#fff" d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0m7.966 10.472c-.117-.982-1.307-.766-1.969-.545-3.403 1.295-6.773 2.686-10.129 4.101-1.95.865-4.039 1.725-5.909 2.755-.911.667.637 1.107 1.694 1.545 1.179.362 2.554.918 3.733.269 2.308-1.327 4.445-2.928 6.634-4.437.399-.255 1.607-1.087 1.199-.1-1.516 1.657-3.213 2.997-4.813 4.574-.56.456-1.142 1.372-.514 2.01 1.917 1.342 3.874 2.642 5.816 3.954.808.645 2.071.122 2.249-.886.516-3.027 1.044-6.053 1.502-9.09.18-1.38.443-2.761.507-4.15"/>
  </svg>
)

const JoinSection = ({ link, title, subtitle, linkText }: JoinSectionProps) => {
  return (
    <section className={s.section}>
      <Title className={s.title} Tag="h3">{title ? title : <>Cледите за новостями<br />в нашем телеграм-канале</>}</Title>
      <Link className={s.link} href={link} variant="outlined">
        {joinIcon}
        {linkText ?? 'Присоединиться'}
      </Link>
      <Text className={s.subtitle} Tag="p">{subtitle ? subtitle : <>А еще там можно выиграть эксклюзивный мерч<br />(только тссс!)</>}</Text>
    </section>
  )
};

export default JoinSection;