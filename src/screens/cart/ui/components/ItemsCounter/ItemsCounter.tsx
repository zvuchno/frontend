'use client'

import React from "react";
import styles from "./ItemsCounter.module.scss";

export const ItemsCounter = ({
  quantity,
  onIncrement,
  onDecrement,
}: {
  quantity: number;
  onIncrement: (e: React.MouseEvent | React.KeyboardEvent) => void;
  onDecrement: (e: React.MouseEvent | React.KeyboardEvent) => void;
}) => {
  return (
    <div className={styles.counterWrapper}>
      <button
        className={styles.counterButton}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onDecrement(e);
        }}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        className={styles.counterButton}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onIncrement(e);
        }}
      >
        +
      </button>
    </div>
  );
};
