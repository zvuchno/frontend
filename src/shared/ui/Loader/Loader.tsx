import s from './Loader.module.scss';

export const Loader = () => {
  return (
    <div 
      className={s.container} 
      role="status" 
      aria-live="polite"
    >
      <div className={s.loader} />
    </div>
  )
};