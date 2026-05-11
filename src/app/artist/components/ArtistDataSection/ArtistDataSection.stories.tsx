import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArtistDataSection } from ".";

const meta = {
  title: "App/Artist/ArtistDataSection",
  component: ArtistDataSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          padding: "40px 0",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArtistDataSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    coverSrc: "",
    description:
      "Летнее «Выгорание» пройдёт 9 и 10 августа в долгожданном и новом для нас формате городского open-air фестиваля на территории арт-кластера!",
    contacts: [],
    socials: [],
  },
};

export const Filled: Story = {
  args: {
    coverSrc: "",
    description:
      "Летнее «Выгорание» пройдёт 9 и 10 августа в долгожданном и новом для нас формате городского open-air фестиваля на территории арт-кластера! Полноценная уличная сцена Summer Stage, 2 live-сцены и одна электронная, а также лекторий, квесты, маркеты, фудкорт, турниры по консольным играм и многое другое для всех выгоревших москвичей и гостей столицы!",
    contacts: [{ id: 1, label: "Букинг", value: "booking@gmail.com" }],
    socials: [{ id: 1, label: "Вконтакте", value: "booking@gmail.com" }],
  },
};
