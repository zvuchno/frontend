import { Meta, StoryObj } from "@storybook/nextjs-vite";
import SizeRange from "./SizeRange";

const meta: Meta<typeof SizeRange> = {
  title: 'widgets/product/ui/components/SizeRange',
  component: SizeRange,
  parameters: {
    layout: 'centred'
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SizeRange>;

const sizes = [
  {
    name: 'S',
    isAvailable: true,
  },
  {
    name: 'M',
    isAvailable: false,
  },
  {
    name: 'L',
    isAvailable: true,
  },
  {
    name: 'XL',
    isAvailable: true,
  },
];

const select = (size: string) => {
  console.log('size:', size)
};

export const SizeRangeDefault: Story = {
  render: () => {
    return (
      <div 
        style={{
          width: '150px',
          height: '150px',
          padding: '20px'
        }}
      >
        <SizeRange sizes={sizes} onClick={select}/>
      </div>
    )
  }
};