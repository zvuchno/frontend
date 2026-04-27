'use client';

import clsx from 'clsx';
import { useState, type ReactNode } from 'react';
import type { AccordionProps } from './Accordion.types';
import styles from './Accordion.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

const defaultAccordionTrigger: ReactNode = (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
   <circle cx="20" cy="20" r="19.5" transform="rotate(90 20 20)" stroke="#100F0D"/>
   <path d="M28 16L19.5147 24.4853L11.0294 16" stroke="#100F0D" strokeLinecap="round"/>
  </svg>)


export const Accordion: React.FC<AccordionProps> = ({
  trigger = defaultAccordionTrigger,
  content,
  wrapperClassName,
  triggerClassName,
  contentClassName,
}: AccordionProps) => {
  
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div
      className={clsx(styles.wrapper, wrapperClassName)}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={crypto.randomUUID()}
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
