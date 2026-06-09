export const validateForm = <T>(
  formData: T,
): { isValid: boolean; errorMessage?: string } => {
  const data = formData as Record<string, string>;

  if ("title" in data && !data.title.trim()) {
    return {
      isValid: false,
      errorMessage: "Введите название",
    };
  }

  if ("login" in data && !data.login.trim()) {
    return {
      isValid: false,
      errorMessage: "Введите логин",
    };
  } else if (!/^[a-zA-Z0-9@./\-_+]+$/.test(data.login)) {
    return {
      isValid: false,
      errorMessage:
        "Логин должен содержать латинские буквы, цифры и символы @/./+/-/_",
    };
  }

  if ("name" in data && !data.name.trim()) {
    return {
      isValid: false,
      errorMessage: "Введите имя",
    };
  } else if (!/^[a-zA-Z0-9@./\-_+]+$/.test(data.name)) {
    return {
      isValid: false,
      errorMessage:
        "Имя должно содержать латинские буквы, цифры и символы @/./+/-/_",
    };
  }

  if ("email" in data && !data.email) {
    return {
      isValid: false,
      errorMessage: "Введите email",
    };
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return {
      isValid: false,
      errorMessage: "Введите корректный email",
    };
  }

  if ("phone" in data && !data.phone) {
    return {
      isValid: false,
      errorMessage: "Введите телефон",
    };
  } else if (data.phone.replace(/\D/g, "").length < 10) {
    return {
      isValid: false,
      errorMessage: "Введите полный номер телефона",
    };
  }

  if ("password" in data && !data.password) {
    return {
      isValid: false,
      errorMessage: "Введите пароль",
    };
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(data.password)) {
    return {
      isValid: false,
      errorMessage:
        "Минимум 8 символов, включая заглавные, строчные буквы и цифры",
    };
  }

  if ("confirmPassword" in data && data.confirmPassword !== data.password) {
    return {
      isValid: false,
      errorMessage: "Пароли не совпадают",
    };
  }

  return {
    isValid: true,
  };
};
