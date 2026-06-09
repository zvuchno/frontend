export const validateField = <T extends Record<keyof T, string>>(
  fieldName: keyof T,
  value: string,
  compareWith?: string,
): string => {
  if (fieldName === "title" && !value.trim()) {
    return "Введите название";
  }

  if (fieldName === "login" && !/^[\w.@+-]+$/.test(value)) {
    return "Только латинские буквы, цифры и символы @/./+/-/_";
  }

  if (fieldName === "name" && !/^[\w.@+-]+$/.test(value)) {
    return "Только латинские буквы, цифры и символы @/./+/-/_";
  }

  if (fieldName === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Введите корректный email";
  }

  if (fieldName === "phone" && value.replace(/\D/g, "").length < 11) {
    return "Введите полный номер телефона";
  }

  if (
    fieldName === "password" &&
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)
  ) {
    return "Минимум 8 символов, включая заглавные, строчные буквы и цифры";
  }

  if (fieldName === "confirmPassword" && value !== compareWith) {
    return "Пароли не совпадают";
  }

  return "";
};
