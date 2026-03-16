import { Meta, StoryObj } from "@storybook/nextjs-vite";
import RoleCard from "./RoleCard";

const meta: Meta<typeof RoleCard> = {
  title: 'shared/RoleCard',
  component: RoleCard,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof RoleCard>;

const cassetteImage = './src/shared/assets/images/cassette.png';
const shirtImage = './src/shared/assets/images/shirt.png';

export const Card: Story = {
  render: () => {
    return (
      <RoleCard 
        image={cassetteImage} 
        title="Как испольнитель" 
        description="Продавай мерч, делись новыми релизами и общайся со своими фанатами"
      />
    )
  }
};

export const CardWithoutDescription: Story = {
  render: () => {
    return (
      <RoleCard image={shirtImage} title="Загрузить мерч"/>
    )
  }
};