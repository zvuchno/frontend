import { Meta, StoryObj } from "@storybook/nextjs-vite";
import TabBar from "./TabBar";

const meta: Meta<typeof TabBar> = {
  title: 'widgets/product/ui/components/TabBar',
  component: TabBar,
  parameters: {
    layout: 'centred'
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TabBar>;

const tabsData = [
  {
    title: 'Описание',
    description: 'Декоративная тарелка в подарочной упаковке, материал: Керамика, диаметр: 27 см'
  },
  {
    title: 'Доставка',
    description: 'Доставка'
  },
  {
    title: 'Возврат',
    description: 'Возврат'
  }
];

export const TabBarDefault: Story = {
  render: () => {
    return (
      <div 
        style={{
          width: '1100px',
          height: '300px',
          padding: '40px 48px',
          border: '2px solid #000'
        }}
      >
        <TabBar data={tabsData} />
      </div>
    )
  }
};