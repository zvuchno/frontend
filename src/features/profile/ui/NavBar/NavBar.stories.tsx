import { type ComponentType } from "react";

import { type Meta, type StoryObj } from "@storybook/nextjs-vite";

import { NavBar } from "./NavBar";

const previewDecorator = (Story: ComponentType) => (
  <div
    style={{
      height: "400px",
      width: "600px",
      padding: "20px",
      border: "2px solid #100f0d",
    }}
  >
    <Story />
  </div>
);

const meta: Meta<typeof NavBar> = {
  title: "features/profile/ui/NavBar",
  component: NavBar,
  tags: ["autodocs"],
  decorators: [previewDecorator],
};

export default meta;
type Story = StoryObj<typeof NavBar>;

const profileRoutes = [
  {
    id: "Профиль",
    href: "",
    label: "Профиль",
  },
  {
    id: "Витрина",
    href: "",
    label: "Витрина",
  },
  {
    id: "Заказы",
    href: "",
    label: "Заказы",
  },
  {
    id: "Финансы",
    href: "",
    label: "Финансы",
  },
];

export const NavBarInProfile: Story = {
  render: () => {
    return <NavBar links={profileRoutes} />;
  },
};
