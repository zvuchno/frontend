import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ShowcaseCard from "./ShowcaseCard";
import { useState } from "react";
import { TProduct } from "../../store/useShowcaseStore";

const container = () => 
  (Story: React.ComponentType) => (
    <div style={{ 
      width: '1000px', 
      height: '150px',
      padding: '20px', 
    }}>
      <Story />
    </div>
  );

const meta: Meta<typeof ShowcaseCard> = {
  title: 'entities/ShowcaseCard',
  component: ShowcaseCard,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof ShowcaseCard>;

const mockProduct: TProduct = {
  id: 1,
  image: 'https://avatars.yandex.net/get-music-content/17649213/93307982.a.41277295-1/m1000x1000',
  name: 'Футболка',
  article: 'артикул 1',
  price: '1000',
  amount: '100',
  visibility: true,
};

const mockPromo = {
  id: 4,
  name: 'SALE20',
  discount: '20',
  period: '01.04 - 25.04',
  amount: 'неограничено',
  visibility: false,
};

export const DefaultShowcaseCard: Story = {
  render: (args) => {
    const [visibility, setVisibility] = useState(args.product?.visibility ?? false);

    return (
      <ShowcaseCard 
        {...args}
        product={args.variant === 'product' ? { ...mockProduct, visibility } : undefined}
        promoCode={args.variant === 'promo' ? { ...mockPromo, visibility } : undefined}
        onToggleVisibility={(newValue) => {
          setVisibility(newValue);
        }}
        onDelete={() => {
          console.log('Item deleted')
        }}
        onEdit={() => {
          console.log('Item changed')
        }}
      />
    )
  },
  args: {
    variant: 'product',
    product: mockProduct,
    promoCode: mockPromo,
    onToggleVisibility: () => {},
    onDelete: () => {},
    onEdit: () => {}
  },
  decorators: [container()]
};
