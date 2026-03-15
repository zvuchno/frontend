import { Link } from '@/shared/ui/Link/Link';
import { Text } from '@/shared/ui/Typography/Typography';
import s from './Footer.module.scss';
import { FooterLink, FooterProps } from './Footer.type';

const defaultLinks: FooterLink[] = [
  { label: 'Контакты', href: '/contacts' },
  { label: 'Каталог', href: '/catalog' },
  { label: 'Для артистов', href: '/for-artists' },
  { label: 'Для фанатов', href: '/for-fans' },
  { label: 'Условия использования', href: '/terms' },
];

const Footer = ({ 
  links = defaultLinks, 
  telegramUrl = 'https://t.me/zvuchno', 
  copyright = '© 2025 «ЗВУЧНО»',
  className 
}: FooterProps) => {
  return (
    <footer className={s.footer}>
      <nav className={s['footer__nav']}>
        {links.map((link) => (
          <Link 
            key={link.href} 
            href={link.href} 
            variant="basic"
            className={s['footer__link']}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className={s['footer__social']}>
        <a 
          href={telegramUrl} 
          className={s['footer__telegram']}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
        >
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0ZM23.9658 10.4717C23.8492 9.49039 22.6593 9.70611 21.9971 9.92676C18.5937 11.2218 15.2242 12.6127 11.8682 14.0283C9.91736 14.8926 7.82938 15.753 5.95898 16.7832C5.04774 17.4504 6.59642 17.8905 7.65332 18.3281C8.83204 18.6903 10.2065 19.2457 11.3857 18.5967C13.6944 17.2705 15.8308 15.6692 18.0205 14.1602C18.419 13.9052 19.6271 13.0728 19.2188 14.0596C17.7027 15.7174 16.0058 17.0574 14.4062 18.6338C13.8455 19.0896 13.2638 20.0055 13.8916 20.6436C15.8089 21.9858 17.7659 23.2858 19.708 24.5977C20.5162 25.2425 21.7794 24.72 21.957 23.7119C22.4727 20.6853 23.0015 17.6587 23.459 14.6221C23.6392 13.2413 23.9019 11.8606 23.9658 10.4717Z" 
              fill="#100F0D"
            />
          </svg>
        </a>
        <Text
          Tag="span"
          variant="normal"
          className={s['footer__copyright']}
        >
          {copyright}
        </Text>
      </div>
    </footer>
  );
};

export default Footer;