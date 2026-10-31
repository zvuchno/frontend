export const TRANSLATIONS: Record<string, string> = {
  all: "Каталог - Все артисты, музыка и эксклюзивный мерч",
  artists: "Каталог - Самые талантливые независимые артисты",
  merch: "Каталог - Винил, CD и мерч от любимых артистов",
  release: "Каталог - Музыкальные треки и альбомы напрямую от артистов",
};

export const ORDER_STATUS_TRANSLATIONS: Record<string, string> = {
  created: "Создан",
  reserved: "Резерв",
  paid: "Оплачен",
  shipped: "Отправлен",
  completed: "Завершен",
  canceled: "Отменен",
};

export const RELEASE_STATUS_TRANSLATIONS: Record<string, string> = {
  pending: "Ожидает сборки",
  building: "Собирается",
  ready: "Готов",
  failed: "Ошибка",
};

export const RELEASE_TYPE_TRANSLATIONS: Record<string, string> = {
  album: "Альбом",
  ep: "EP",
  single: "Сингл",
};
