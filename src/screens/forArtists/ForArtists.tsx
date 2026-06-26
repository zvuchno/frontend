import clsx from "clsx";
import Link from "next/link";

import { ApproveSection } from "@/widgets/ApproveSection";
import { Roadmap } from "@/widgets/Roadmap";
import { roadmapItems } from "@/widgets/Roadmap";
import { SectionFAQ } from "@/widgets/SectionFAQ";
import { HeroUI } from "@/widgets/layout/main/Hero";

import { FAQItemsForArtists, artistInfo } from "@/shared/constants";
import { AccentContainer, ButtonUI, DescriptionArea, Title } from "@/shared/ui";

import styles from "./ForArtists.module.scss";

export const ForArtists = () => (
  <>
    <section>
      <HeroUI
        mainTitle=''
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
            <ButtonUI variant={"primary"} size='large'>
              <Link href={"/role"} prefetch={false}>
                присоединиться к бете
              </Link>
            </ButtonUI>
          </div>
          <div className={styles.sectionImage}>
            <img src='/images/image_for-artists_header_bg.png' loading='lazy' />
          </div>
        </>
      </HeroUI>
    </section>
    <section className={clsx(styles.mainSection)}>
      <section className={clsx(styles.sectionArea, styles.firstSection)}>
        <Title Tag='h2' className={styles.mainSectionTitle}>
          С заботой о музыкантах
          <br />и их фанатах
        </Title>
        <div className={styles.width825}>
          <DescriptionArea headerwithIcons={false} colorOption={"blue"} border>
            <div className={styles.content}>
              <p>
                Артист в текущих реалиях практически бесплатно обслуживает стриминги и соцсети.
                Вместо творчества он вынужден клепать контент и драться с равнодушными алгоритмами.
                А фанаты, которые хотят поддержать любимого музыканта, приносят прибыль только
                корпорациям и агрегаторам.
              </p>
              <p>
                ЗВУЧНО - первый на российском рынке сервис прямой поддержки артистов.
                <br />
                Это не очередной стриминг - мы хотим, чтобы музыка приносила тебе деньги.
              </p>
            </div>
          </DescriptionArea>
          <div className={styles.sectionImage}>
            <img src='/images/for-artists_main-bg-1.png' loading='lazy' />
          </div>
        </div>
      </section>
      <section className={clsx(styles.sectionArea, styles.secondSection)}>
        <Title Tag='h2' className={clsx(styles.mainSectionTitle, styles.textRight)}>
          На «Звучно» можно
        </Title>
        <AccentContainer className={styles.content}>
          <ul className={styles.contentList}>
            <li className={styles.listItem}>
              <h3 className={styles.listItemTitle}>продавать музыку</h3>
              <p>
                как на Bandcamp, но без проблем с оплатами: легально, безопасно и без танцев с
                бубном
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
                преврати стойку мерча в ПВЗ - фанаты купят онлайн, а мерчер выдаст по коду в тг-боте
              </p>
            </li>
          </ul>
        </AccentContainer>
        <div className={styles.sectionImage}>
          <img src='/images/for-artists_main-bg-2.png' loading='lazy' />
        </div>
      </section>
      <section className={clsx(styles.sectionArea, styles.thirdSection)}>
        <div className={styles.content}>
          <div className={styles.sectionContentImage}>
            <img src='/images/for-artists_white-page.png' loading='lazy' />
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
            <img src='/images/for-artists_main-bg-3.png' loading='lazy' />
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
        <Title Tag='h2' className={clsx(styles.mainSectionTitle, styles.textCenter)}>
          КОГо мы ищем?
        </Title>
        <AccentContainer>
          <DescriptionArea headerwithIcons={true} colorOption={"blue"}>
            <div className={styles.content}>
              <p>
                Сейчас мы отбираем проекты по заявкам - ищем активных артистов с живой аудиторией
              </p>
              <p>
                Потом у нас появится больше ресурсов для помощи начинающим музыкантам, мы выйдем из
                беты, и пользователем ЗВУЧНО сможет стать кто угодно
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
            Команда ЗВУЧНО ценит человека, его жизнь и эмоции, которые стоят за творчеством. Поэтому
            ни в бете, ни после мы не допустим на нашу платформу музыку, которая полность или
            частично сделана с ИИ.
          </p>
          <div className={styles.sectionImage}>
            <img src='/images/for-artists_record-type.png' loading='lazy' />
          </div>
        </AccentContainer>
      </section>
      <section className={clsx(styles.sectionArea, styles.sevenSection)}>
        <AccentContainer>
          <DescriptionArea headerwithIcons={true} colorOption={"grey"}>
            <div className={styles.content}>
              <span>Присоединиться к бете</span>
              <ButtonUI variant={"accentDark"} size='large'>
                <Link href={"/role"} prefetch={false}>
                  присоединиться
                </Link>
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
