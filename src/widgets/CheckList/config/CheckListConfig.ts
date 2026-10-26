"useClient";

import type { ConfigItem, TCheckListResponse } from "../model/types";

export const checklistConfig: Record<keyof TCheckListResponse, ConfigItem> = {
  add_first_product: {
    label: "Добавить первый товар",
    actionType: "none",
  },
  payout_details: {
    label: "Заполнить данные для выплат",
    actionType: "link",
    href: "/artist/data",
  },
  cdek_integration: {
    label: "Подключить доставку СДЭК (для мерча)",
    actionType: "link",
    href: "/artist/settings",
  },
  telegram_bot: {
    label: "Подключить тг-бота для получения уведомлений",
    actionType: "button",
  },
  publish_first_product: {
    label: "Опубликовать первый товар",
    actionType: "none"
  },
  email_verified: {
    label: "Подтвердить e-mail",
    actionType: "none",
  },
  artist_cover: {
    label: "Загрузить обложку профиля",
    actionType: "link",
    href: "/artist/profile",
  }
}