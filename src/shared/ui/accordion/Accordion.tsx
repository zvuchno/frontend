'use client';

import clsx from 'clsx';
import { useState, useId, type ReactNode } from 'react';
import type { AccordionProps } from './Accordion.types';
import styles from './Accordion.module.scss';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import CardArtist from '@/entities/Artist/ui/CardArtist/CardArtist';

const defaultAccordionTrigger: ReactNode = <Image src="/arrow-in-circle.svg" alt="trigger" width={40} height={40} />;

export const Accordion: React.FC<AccordionProps> = ({
  artistCardInfo,
  trigger = defaultAccordionTrigger,
  content,
  containerClassName,
  labelClassName,
  triggerClassName,
  contentClassName,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const id = useId();
  return (
    <div
      className={clsx(styles.container, containerClassName)}
    >
      <div className={labelClassName}>
        <CardArtist image={artistCardInfo?.image} description={artistCardInfo?.description} hasButton={artistCardInfo?.hasButton}/>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={id}
            className={clsx(styles.content, contentClassName)}
            initial={{ opacity: 0.5, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0.5, height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {content.map((paragraph) => (
              <p key={crypto.randomUUID()}>{paragraph}</p>
            ))}
          </motion.div>
        )}
        <motion.div
          layout
          className={clsx(styles.trigger, { [styles.trigger_rotated]: isOpen }, triggerClassName)}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => setIsOpen(!isOpen)}
          >
            {trigger}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
