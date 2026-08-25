import styles from "./Contacts.module.scss";

export const Contacts = () => (
  <article className={styles.contacts}>
    <div className={styles.contactsDetails}>
      Мы открыты к диалогу — пишите на нашу почту
      <span className={styles.contactsEmail}> support@zvuchno.space </span>
    </div>
    <div className={styles.contactsLegal}>
      ИП ПЕРЕВЕДЕНЦЕВ АНТОН АНДРЕЕВИЧ
      <br />
      ИНН 772748157965 <br />
      ОГРН 325774600478191
    </div>
  </article>
);
