import clsx from "clsx";

import styles from "../../ForArtists.module.scss";

export const ForArtistsComissionSection = () => (
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
);
