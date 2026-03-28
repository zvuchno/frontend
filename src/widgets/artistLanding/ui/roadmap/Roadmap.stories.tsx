import type { CSSProperties } from "react";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Roadmap } from "./Roadmap";
import type { RoadmapItem } from "./Roadmap.types";

const roadmapItems: RoadmapItem[] = [
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

const meta = {
  title: "Widgets/ArtistLanding/Roadmap",
  component: Roadmap,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <style>
          {`
            @font-face {
              font-family: 'Feature Mono Custom';
              src: url('/fonts/FeatureMono-Regular.ttf') format('truetype');
              font-weight: 400;
            }
            @font-face {
              font-family: 'Feature Mono Custom';
              src: url('/fonts/FeatureMono-Bold.ttf') format('truetype');
              font-weight: 700;
            }
            @font-face {
              font-family: 'Better VCR Custom';
              src: url('/fonts/BetterVCR.woff2') format('woff2');
              font-weight: 400;
            }
          `}
        </style>

        <div
          style={
            {
              minHeight: "100vh",
              "--font-feature-mono": "'Feature Mono Custom', monospace",
              "--font-better-vcr": "'Better VCR Custom', monospace",
            } as CSSProperties
          }
        >
          <Story />
        </div>
      </>
    ),
  ],
} satisfies Meta<typeof Roadmap>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Ты нам подойдешь, если:",
    items: roadmapItems,
  },
};

export const AutoAlternate: Story = {
  args: {
    title: "Ты нам подойдешь, если:",
    items: roadmapItems.map(({ id, title, description }) => ({
      id,
      title,
      description,
    })),
    autoAlternate: true,
  },
};

export const LongContent: Story = {
  args: {
    title: "Ты нам подойдешь, если:",
    items: [
      {
        id: "long-russia",
        title: "Работаешь в России и уже понимаешь локальные ограничения рынка",
        description:
          "Наши интеграции для оплат и доставок пока хорошо работают только внутри РФ, поэтому на старте нам важно, чтобы ты мог комфортно запускать продажи и не упирался в базовую операционку.",
        side: "left",
      },
      {
        id: "long-status",
        title: "Есть ИП или самозанятость",
        description:
          "Понятный юридический статус защитит тебя от блокировок и снимет часть рисков вокруг денежных операций и запуска мерча.",
        side: "right",
      },
      {
        id: "long-active",
        title: "Не в творческом отпуске и регулярно остаешься на виду",
        description:
          "Выступаешь хотя бы раз в полгода, не пропадаешь надолго и поддерживаешь понятный для аудитории ритм релизов и анонсов.",
        side: "left",
      },
    ],
  },
};
