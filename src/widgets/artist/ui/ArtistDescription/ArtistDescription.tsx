"use client";

import { Text, Title } from '@/shared/ui/Typography/Typography';
import s from './ArtistDescription.module.scss';
import { ArtistDescriptionProps } from './ArtistDescription.type';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

const ArtistDescription = ({ variant, description, title }: ArtistDescriptionProps) => {

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [shouldShowButton, setShouldShowButton] = useState<boolean>(false);
  const textRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {

    if (variant === 'profile') return;

    const el = textRef.current;

    if (el) {
      const scrollHeight = el.scrollHeight;
      el.style.height = `${scrollHeight}px`;

      if (scrollHeight > 60) {
        setShouldShowButton(true);
      }
    }

  }, []);

  useEffect(() => {

    const el = textRef.current;

    if (!el) return;

    if (isExpanded) {
      const scrollHeight = el.scrollHeight;

      if (scrollHeight > 500) {
        el.style.overflowY = 'scroll';
      }
      
    } else {
      el.style.overflowY = 'hidden';
    }

  }, [isExpanded]);

  const toggleExpend = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div 
      className={clsx(s.container, {[s.container_inCatalog]: variant === 'catalog'})}
    >

      <div 
        className={clsx(s.header, {[s.header_inCatalog]: variant === 'catalog'})}
      >
        {title && (
          <Title Tag='h4' variant='title' className={s.header__title}>{title}</Title>
        )}
      </div>

      <div 
        className={clsx(s.content, {[s.content_inCatalog]: variant === 'catalog'})}
      >
        
        <div
          ref={textRef}
          className={clsx({[s.content__textWrapper]: variant === 'catalog'}, {[s.content__textWrapper_expended]: isExpanded})}
        >
          <Text Tag='p' className={s.content__text}>{description}</Text>
        </div>

        {shouldShowButton && (
          <button 
            type='button'
            className={clsx(s.content__button, {[s.content__button_rotate]: isExpanded})} 
            onClick={toggleExpend}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" fill="none" viewBox="0 0 10 6">
              <path stroke="#100f0d" stroke-linecap="round" d="M8.984.5 4.742 4.743.499.5"/>
            </svg>
          </button>
        )}

      </div>

    </div>
  )
};

export default ArtistDescription;