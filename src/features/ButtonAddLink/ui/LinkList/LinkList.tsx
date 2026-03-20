import styles from './LinkList.module.scss';

interface LinkItem {
  id: string;
  value: string;
}

interface LinkListProps {
  title?: string;
  links: LinkItem[];
  placeholder?: string;
  onAdd: () => void;
  onDelete: (id: string) => void;
  addLabel?: string;
}

export const LinkList = ({
  title,
  links,
  placeholder = 'booking@gmail.com',
  onAdd,
  onDelete,
  addLabel = '+ Добавить',
}: LinkListProps) => {
  return (
    <div className={styles.wrapper}>
      {title && <h4 className={styles.title}>{title}</h4>}

      <div className={styles.list}>
        {links.map((link) => (
          <div key={link.id} className={styles.item}>
            <input
              className={styles.input}
              type="text"
              value={link.value}
              placeholder={placeholder}
              readOnly
            />
            <button
              className={styles.deleteBtn}
              onClick={() => onDelete(link.id)}
              aria-label="Удалить ссылку"
              type="button"
            >
              🗑
            </button>
          </div>
        ))}
      </div>

      <button className={styles.addBtn} onClick={onAdd} type="button">
        {addLabel}
      </button>
    </div>
  );
};