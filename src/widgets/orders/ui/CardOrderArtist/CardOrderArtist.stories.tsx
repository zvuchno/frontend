import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CardOrderArtist } from "./CardOrderArtist";
import { CardOrderArtistProps } from "./CardOrderArtist.types";

const meta = {
  title: "Widgets/Orders/CardOrderArtist",
  component: CardOrderArtist,
  parameters: {
    layout: "centered",
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
          `}
        </style>
        <div
          style={{
            width: "944px",
            minHeight: "455px",
            padding: "24px 0 40px",
          }}
        >
          <Story />
        </div>
      </>
    ),
  ],
} satisfies Meta<typeof CardOrderArtist>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseProducts: CardOrderArtistProps["products"] = [
  {
    id: "product-card-artist-merch",
    image: "/shirt.png",
    imageWidth: 139,
    imageHeight: 139,
    variant: "merch",
    definitions: [
      { label: "Футболка", value: "от ACDC" },
      { label: "Размер", value: "L" },
      { label: "Кол-во", value: "1 шт" },
    ],
  },
  {
    id: "product-card-artist-music",
    image: "/record.png",
    imageWidth: 126,
    imageHeight: 119,
    variant: "music",
    definitions: [
      {
        label: "Виниловый альбом",
        value: '"Мы не спали, мы смотрели на звезды и ждали утро"',
      },
      { label: "Тип", value: "Винил" },
      { label: "Кол-во", value: "1 шт" },
    ],
  },
];

const baseArgs: CardOrderArtistProps = {
  orderId: "35783-95",
  status: "delivered",
  address: "Россия, г.Москва, ул.Советская, д.3",
  deliveryType: "Яндекс-доставка",
  recipientFIO: "Костантинов Константин Костантинович",
  totalPrice: 1500,
  orderDate: new Date(),
  message: "Вы очень крутые !",
  products: baseProducts,
  onAccepted: () => {},
  onRejected: () => {},
};

export const Default: Story = {
  args: baseArgs,
};

export const WithoutMessage: Story = {
  args: {
    ...baseArgs,
    message: undefined,
  },
};

export const SingleProduct: Story = {
  args: {
    ...baseArgs,
    products: [baseProducts[0]],
  },
};
