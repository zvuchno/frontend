"use client";

import React from "react";

import styles from "./ItemsCounter.module.scss";

export const ItemsCounter = ({
  quantity,
  onIncrement,
  onDecrement,
  incrementDisabled,
  decrementDisabled,
}: {
  quantity: number;
  incrementDisabled?: boolean;
  decrementDisabled?: boolean;
  onIncrement: (e: React.MouseEvent | React.KeyboardEvent) => void;
  onDecrement: (e: React.MouseEvent | React.KeyboardEvent) => void;
}) => {
  return (
    <div className={styles.counterWrapper}>
      <button
        type='button'
        className={styles.counterButton}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onDecrement(e);
        }}
        disabled={decrementDisabled}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        type='button'
        className={styles.counterButton}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onIncrement(e);
        }}
        disabled={incrementDisabled}
      >
        +
      </button>
    </div>
  );
};
