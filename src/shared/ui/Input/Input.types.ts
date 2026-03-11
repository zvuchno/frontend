/**
 * Пропсы для компонента Input
 * 
 * label - подпись к полю ввода
 * id - для связи инпута и лэйбла
 * error - состояние валидации
 * message - сообщение под инпутом (ошибка или подсказка)
 * inputSize - размер инпута (по внутренним отступам)
 * style - дополнительные inline-стили
 * multiline — если true, инпут становится многострочным (textarea)
 * rows — количество строк для многострочного инпута
 */

import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: boolean;
  message?: string;
  inputSize?: 'small' | 'large';
  style?: React.CSSProperties;
  multiline?: boolean;
  rows?: number;
};