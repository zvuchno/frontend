const REG_EXP_FOR_EMAIL = /^(?=.{1,64}@)[a-zA-Z0-9](?:[a-zA-Z0-9_-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9_-]{0,61}[a-zA-Z0-9])?)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

export const validateForm = <T>(
  formData: T,
): { isValid: boolean; errorMessage?: string } => {
  const data = formData as Record<string, string | boolean>;

  if ("title" in data && !(data.title as string).trim()) {
    return {
      isValid: false,
      errorMessage: "Введите название",
    };
  }

  if ("login" in data) {
    if (!(data.login as string).trim()) {
      return {
        isValid: false,
        errorMessage: "Введите имя пользователя",
      };
    } else if (!/^[а-яА-Яa-zA-Z0-9@./\-_+]+$/.test(data.login as string)) {
      return {
        isValid: false,
        errorMessage:
          "В имени пользователя допустимы буквы, цифры и символы: @./-_+",
      };
    } 
  }

  if ("email" in data) {
    if (!data.email) {
      return {
        isValid: false,
        errorMessage: "Введите email",
      };
    } else if (!REG_EXP_FOR_EMAIL.test(data.email as string)) {
      return {
        isValid: false,
        errorMessage: "Введите корректный email",
      };
    }
  }

  if ("phone" in data) {
    if (!data.phone) {
      return {
        isValid: false,
        errorMessage: "Введите телефон",
      };
    } else if ((data.phone as string).replace(/\D/g, "").length < 10) {
      return {
        isValid: false,
        errorMessage: "Введите полный номер телефона",
      };
    }
  }

  if ("password" in data) {
    if (!data.password) {
      return {
        isValid: false,
        errorMessage: "Введите пароль",
      };
    } else if (!/^(?=\S{8,}$)[a-zA-Z0-9\W]*$/.test(data.password as string)) {
      return {
        isValid: false,
        errorMessage:
          "Пароль должен содержать минимум 8 символов: латинские буквы, цифры, спецсимволы (без пробелов)",
      };
    }
  }

  if ("confirmPassword" in data && "password" in data) {
    if (data.confirmPassword !== data.password) {
      return {
        isValid: false,
        errorMessage: "Пароли не совпадают",
      };
    }
  }

  if ("artist_offer" in data && !data.artist_offer) {
    return {
      isValid: false,
      errorMessage: "Подтвердите согласие с условиями оферты"
    }
  }

  if ("listener_offer" in data && !data.listener_offer) {
    return {
      isValid: false,
      errorMessage: "Подтвердите согласие с условиями оферты"
    }
  }

  if ("privacy_policy" in data && !data.privacy_policy) {
    return {
      isValid: false,
      errorMessage: "Подтвердите согласие на обработку персональных данных"
    }
  }

  if ("artist_distribution" in data && !data.artist_distribution) {
    return {
      isValid: false,
      errorMessage: "Подтвердите согласие на распространение персональных данных"
    }
  }

  if ("listener_distribution" in data && !data.listener_distribution) {
    return {
      isValid: false,
      errorMessage: "Подтвердите согласие на распространение персональных данных"
    }
  }

  return {
    isValid: true,
  };
};
