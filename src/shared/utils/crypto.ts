import { randomBytes } from 'crypto';

/**
 * Генерирует криптографически стойкую случайную строку заданной длины.
 * @param length Длина строки
 * @returns Случайная строка из hex-символов (a-f, 0-9)
 */
export function createSecureRandomString(length: number): string {
  if (length <= 0) {
    throw new Error('Длина должна быть больше 0');
  }

  // randomBytes возвращает Buffer, .toString('hex') конвертирует в строку
  return randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};