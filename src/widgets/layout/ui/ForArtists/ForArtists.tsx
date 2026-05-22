import HeroUI from "@/widgets/Main/ui/Hero/Hero";
import { AccentContainer } from "../accentContainer";
import { Roadmap } from "@/widgets/artistLanding/ui/roadmap";
import { roadmapItems } from "@/shared/constants/roadmapItems";
import { ButtonUI } from "@/shared/ui/button";
import { ApproveSection } from "@/widgets/landingArtist/ui/ApproveSection/ApproveSection";
import SectionFAQ from "@/app/components/SectionFAQ/SectionFAQ";
import { FAQItemsForArtists } from "@/shared/constants/faqItemsForArtists";
import styles from "./ForArtists.module.scss";
import { Title } from "@/shared/ui/Typography/Typography";
import clsx from "clsx";
import Link from "next/link";
import { DescriptionArea } from "@/shared/ui/descriptionArea/DescriptionArea";
import { ArtistInfo } from "@/widgets/landingArtist/ui/ApproveSection/ApproveSection.types";

const artistInfo: ArtistInfo[] = [
  {
    image:
      "https://img.freepik.com/free-photo/musician-playing-electric-guitar_23-2151414264.jpg",
    description: "JEW3SS",
    content: [
      "Как только услышал о проекте «Звучно», сразу побежал к ним в предложку. Боялся, что уже весь мир инди-рока там, а я проворонил новую молодëжную движуху! Оказалось, я им вообще первый написал и это для меня и для них оказался первый опыт.",
      "Очень приветливые эти ребята из «Звучно». Чуткие и пунктуальные, приятно с ними иметь дело. Да и в целом крутые чуваки с крутыми идеями и стилем! ",
    ],
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Schwejk_cropped.jpg/1200px-Schwejk_cropped.jpg",
    description: "ОДИН МАНУЛ",
    content: [
      "Как только услышал о проекте «Звучно», сразу побежал к ним в предложку. Боялся, что уже весь мир инди-рока там, а я проворонил новую молодëжную движуху! Оказалось, я им вообще первый написал и это для меня и для них оказался первый опыт.",
      "Очень приветливые эти ребята из «Звучно». Чуткие и пунктуальные, приятно с ними иметь дело. Да и в целом крутые чуваки с крутыми идеями и стилем! ",
      "Прикиньте только, они индустрию перевернуть хотят! Понимание взаимодействия с артистом в стране вообще изменить! Такие темы я очень уважаю, поэтому рад, что наш музыкальный проект приобщился к данной платформе. Надеюсь, что скоро весь мир ахнет от силы низовой самоорганизации!",
      "",
    ],
  },
  {
    image:
      "https://cdnuploads.aa.com.tr/uploads/Contents/2024/03/23/thumbs_b_c_4e1dc3413e07d9708b3a82f4c626a220.jpg",
    description: "САЛЮТ",
    content: [""],
  },
];

export const ForArtists = () => (
  <>
    <section>
      <HeroUI
        mainTitle=""
        leftText={{
          firstPart: "Зарабатывай на музыке,",
          secondPart: "оставаясь артистом",
        }}
        rightText={{
          firstPart: "А Звучно поможет с эквайрингом,",
          secondPart: "доставкой и прочей рутиной",
        }}
        className={styles.headerSection}
      >
        <>
          <div className={styles.headerSectionButton}>
            <ButtonUI variant={"primary"} size="large">
              <Link href={"/role"}>присоединиться к бете</Link>
            </ButtonUI>
          </div>
          <div className={styles.sectionImage}>
            <img src="image_for-artists_header_bg.png"></img>
          </div>
        </>
      </HeroUI>
    </section>
    <section className={clsx(styles.mainSection)}>
      <section className={clsx(styles.sectionArea, styles.firstSection)}>
        <Title Tag="h2" className={styles.mainSectionTitle}>
          С заботой о музыкантах
          <br />и их фанатах
        </Title>
        <div className={styles.width825}>
          <DescriptionArea headerwithIcons={false} colorOption={"blue"} border>
            <div className={styles.content}>
              <p>
                Артист в текущих реалиях практически бесплатно обслуживает
                стриминги и соцсети. Вместо творчества он вынужден клепать
                контент и драться с равнодушными алгоритмами. А фанаты, которые
                хотят поддержать любимого музыканта, приносят прибыль только
                корпорациям и агрегаторам.
              </p>
              <p>
                ЗВУЧНО - первый на российском рынке сервис прямой поддержки
                артистов.
                <br />
                Это не очередной стриминг - мы хотим, чтобы музыка приносила
                тебе деньги.
              </p>
            </div>
          </DescriptionArea>
          <div className={styles.sectionImage}>
            <img src="for-artists_main-bg-1.png" />
          </div>
        </div>
      </section>
      <section className={clsx(styles.sectionArea, styles.secondSection)}>
        <Title
          Tag="h2"
          className={clsx(styles.mainSectionTitle, styles.textRight)}
        >
          На «Звучно» можно
        </Title>
        <AccentContainer className={styles.content}>
          <ul className={styles.contentList}>
            <li className={styles.listItem}>
              <h3 className={styles.listItemTitle}>продавать музыку</h3>
              <p>
                как на Bandcamp, но без проблем с оплатами: легально, безопасно
                и без танцев с бубном
              </p>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.listItemTitle}>продавать мерч онлайн</h3>
              <p>
                без рутины, отнимающей время - тебе
                <br />
                останется только отнести заказы в СДЭК
              </p>
            </li>
            <li className={styles.listItem}>
              <h3 className={styles.listItemTitle}>
                ВЫдавать заказы
                <br />
                на концертах
              </h3>
              <p>
                преврати стойку мерча в ПВЗ - фанаты купят онлайн, а мерчер
                выдаст по коду в тг-боте
              </p>
            </li>
          </ul>
        </AccentContainer>
        <div className={styles.sectionImage}>
          <img src="for-artists_main-bg-2.png" />
        </div>
      </section>
      <section className={clsx(styles.sectionArea, styles.thirdSection)}>
        <div className={styles.content}>
          <div className={styles.sectionContentImage}>
            <img src="for-artists_white-page.png" />
            <div className={clsx(styles.contentText)}>
              <p className={clsx(styles.textBold, styles.highlightedText)}>
                Без принудительных скидок,
                <br />
                штрафов и скрытых расходов.
              </p>
              <p className={styles.highlightedText}>
                <span className={styles.textBold}>Только комиссия 15%</span>
                <br />
                <span>
                  В эту сумму уже входят
                  <br />
                  обработка заказов, эквайринг
                  <br />и другие расходы с нашей
                  <br />
                  стороны
                </span>
              </p>
            </div>
          </div>

          <div className={styles.sectionImage}>
            <img src="for-artists_main-bg-3.png" />
          </div>
        </div>
        <span className={styles.sectionText}>
          С нами ты выйдешь в плюс, а не разоришься
          <br />
          на инфраструктуре — наша комиссия ниже,
          <br />
          чем на крупных маркетплейсах.
        </span>
      </section>
      <section className={clsx(styles.sectionArea, styles.forthSection)}>
        <Title
          Tag="h2"
          className={clsx(styles.mainSectionTitle, styles.textCenter)}
        >
          КОГо мы ищем?
        </Title>
        <AccentContainer>
          <DescriptionArea headerwithIcons={true} colorOption={"blue"}>
            <div className={styles.content}>
              <p>
                Сейчас мы отбираем проекты по заявкам - ищем активных артистов с
                живой аудиторией
              </p>
              <p>
                Потом у нас появится больше ресурсов для помощи начинающим
                музыкантам, мы выйдем из беты, и пользователем ЗВУЧНО сможет
                стать кто угодно
              </p>
            </div>
          </DescriptionArea>
        </AccentContainer>
      </section>
      <section className={clsx(styles.sectionArea, styles.fifthSection)}>
        <Roadmap title={"ты нам подойдешь, если:"} items={roadmapItems} />
      </section>
      <section className={clsx(styles.sectionArea, styles.sixsSection)}>
        <AccentContainer className={styles.content}>
          <h3>МЫ ЗА ИСКРЕННЕЕ САМОВЫРАЖЕНИЕ</h3>
          <p>
            Команда ЗВУЧНО ценит человека, его жизнь и эмоции, которые стоят за
            творчеством. Поэтому ни в бете, ни после мы не допустим на нашу
            платформу музыку, которая полность или частично сделана с ИИ.
          </p>
          <div className={styles.sectionImage}>
            <img src="for-artists_record-type.png" />
          </div>
        </AccentContainer>
      </section>
      <section className={clsx(styles.sectionArea, styles.sevenSection)}>
        <AccentContainer>
          <DescriptionArea headerwithIcons={true} colorOption={"grey"}>
            <div className={styles.content}>
              <span>Присоединиться к бете</span>
              <ButtonUI variant={"accentDark"} size="large">
                <Link href={"/role"}>присоединиться</Link>
              </ButtonUI>
            </div>
          </DescriptionArea>
        </AccentContainer>
      </section>
      <section className={clsx(styles.sectionArea, styles.eightSection)}>
        <ApproveSection artistInfo={artistInfo} />
      </section>
      <section>
        <SectionFAQ title={"FAQ"} items={FAQItemsForArtists} />
      </section>
    </section>
  </>
);
