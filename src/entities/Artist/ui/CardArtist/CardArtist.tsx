import clsx from "clsx";
import s from './CardArtist.module.scss';

const CardArtist = () => {
  return (
    <div className={clsx(s.cardWrapper)}>
      <div className={clsx(s.card_corner)} />
      <div className={s.card}>
        {/* <img 
          className={s.card__image} 
          src='https://static.vecteezy.com/system/resources/previews/041/486/590/non_2x/children-ponder-the-question-cartoon-characters-girl-and-boy-for-children-design-knowledge-and-education-concept-illustration-vector.jpg'
        /> */}
      </div>
    </div>
  )
}

export default CardArtist;