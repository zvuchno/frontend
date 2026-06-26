import { type RoadmapItem } from "../model/Roadmap.types";


export const roadmapItems: RoadmapItem[] = [
  {
    id: "russia",
    title: "Работаешь в России",
    description:
      "Наши интеграции для оплат и доставок пока хорошо работают только внутри РФ",
    side: "left",
  },
  {
    id: "self-employed",
    title: "Есть ИП или самозанятость",
    description: "Понятный статус защитит тебя от блокировок",
    side: "right",
  },
  {
    id: "active-artist",
    title: "Не в творческом отпуске",
    description:
      "Выступаешь хотя бы раз в полгода и регулярно выпускаешь релизы",
    side: "left",
  },
  {
    id: "merch",
    title: "Продаешь свой мерч",
    description: "Или планируешь в обозримом будущем",
    side: "right",
  },
  {
    id: "fans",
    title: "Уже есть фанаты",
    description: "Живые и вовлеченные подписчики в соцсетях",
    side: "left",
  },
  {
    id: "experiments",
    title: "Не боишься экспериментов",
    description:
      "С нами ты будешь тестировать разные механики продвижения и регулярно делать анонсы в соцсетях",
    side: "right",
  },
];
