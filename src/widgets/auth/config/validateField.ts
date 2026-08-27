const REG_EXP_FOR_EMAIL = /^(?=.{1,64}@)[a-zA-Z0-9](?:[a-zA-Z0-9_-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9_-]{0,61}[a-zA-Z0-9])?)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

export const validateField = <T extends Record<keyof T, string>>(
  fieldName: keyof T,
  value: string,
  compareWith?: string,
): string => {
  if (fieldName === "title" && !value.trim()) {
    return "Введите название";
  }

  if (fieldName === "login" && !/^[а-яА-Яa-zA-Z0-9@./\-_+]+$/.test(value)) {
    return "Допустимы буквы, цифры и символы: @./-_+";
  }

  if (fieldName === "email" && !REG_EXP_FOR_EMAIL.test(value)) {
    return "Введите корректный email";
  }

  if (fieldName === "phone" && value.replace(/\D/g, "").length < 11) {
    return "Введите полный номер телефона";
  }

  if (
    fieldName === "password" &&
    !/^(?=\S{8,}$)[a-zA-Z0-9\W]*$/.test(value)
  ) {
    return "Минимум 8 символов: латинские буквы, цифры, спецсимволы (без пробелов)";
  }

  if (fieldName === "confirmPassword" && value !== compareWith) {
    return "Пароли не совпадают";
  }

  return "";
};
