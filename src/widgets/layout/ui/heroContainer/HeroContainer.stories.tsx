import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HeroContainer } from "./HeroContainer";
import storyStyles from "./HeroContainer.stories.module.scss";

const mockContent = {
  eyebrow: "Lorem ipsum dolor sit amet.",
  title: "HeroContainer",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, consectetur.",
};

const meta = {
  title: "Widgets/Layout/HeroContainer",
  component: HeroContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: "500px",
          padding: "24px 0 40px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className={storyStyles.storyContent}>
        <span>{mockContent.eyebrow}</span>
        <h2>{mockContent.title}</h2>
        <p>{mockContent.description}</p>
      </div>
    ),
    className: storyStyles.defaultContainer,
  },
};

export const WithCustomPadding: Story = {
  args: {
    children: (
      <div className={storyStyles.storyContent}>
        <span>{mockContent.eyebrow}</span>
        <h2>Custom spacing</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt, cum.
        </p>
      </div>
    ),
    className: storyStyles.customPaddingContainer,
  },
};

export const Empty: Story = {
  args: {
    className: storyStyles.emptyContainer,
  },
};
