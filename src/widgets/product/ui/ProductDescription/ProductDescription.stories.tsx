import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProductDescription from "./ProductDescription";

const meta: Meta<typeof ProductDescription> = {
  title: 'widgets/product/ui/ProductDescription',
  component: ProductDescription,
  parameters: {
    layout: 'centred'
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProductDescription>;

const album = {
  id: 1,
  name: 'Альбом "Выхино"',
  images: [
    'https://s0.rbk.ru/v6_top_pics/media/img/2/41/347645792821412.jpeg',
    'https://petbistro.ru/upload/medialibrary/89f/rkwkir1cf7k6jt9d6tp7xdtpg735mw6s.jpg',
    'https://img.freepik.com/premium-photo/portrait-dog-looking-away-field_1048944-23249037.jpg?semt=ais_hybrid&w=740',
    'https://img.freepik.com/free-photo/ai-generated-labrador-retriever-dog-picture_23-2150644660.jpg?semt=ais_hybrid&w=740',
  ],
  description: `Первый сольный альбом, сведенный во Владивостоке. Название отсылает к настоящему кинотеатру в районе Чертаново,
    который закрыли в 2012 году. Одложка - совокупность людей и вешей, что повлияли на создание треков. Первым нас встречает
    "43 регион" - номер кирова.`,
  delivery: 'Доставка',
  refund: 'Возврат',
  artistImage: 'https://s0.rbk.ru/v6_top_pics/media/img/2/41/347645792821412.jpeg',
  artistName: 'JEW3SS',
};

const merch = {
  id: 2,
  name: 'Футболка "Мыльные пузыри"',
  images: [
    'https://s0.rbk.ru/v6_top_pics/media/img/2/41/347645792821412.jpeg',
    'https://petbistro.ru/upload/medialibrary/89f/rkwkir1cf7k6jt9d6tp7xdtpg735mw6s.jpg',
    'https://img.freepik.com/premium-photo/portrait-dog-looking-away-field_1048944-23249037.jpg?semt=ais_hybrid&w=740',
    'https://img.freepik.com/free-photo/ai-generated-labrador-retriever-dog-picture_23-2150644660.jpg?semt=ais_hybrid&w=740',
  ],
  description: 'Декоративная тарелка в подарочной упаковке, материал: Керамика, диаметр: 27 см',
  delivery: 'Доставка',
  refund: 'Возврат',
  artistImage: 'https://s0.rbk.ru/v6_top_pics/media/img/2/41/347645792821412.jpeg',
  artistName: 'JEW3SS',
  itemNumber: 'MPLS-OKNA-MK01',
  price: 2500,
  sizes: [
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
  ],
};

export const AlbumDescription: Story = {
  render: () => {
    return (
      <div 
        style={{
          width: '1368px',
          height: '700px',
        }}
      >
        <ProductDescription variant="album" product={album}/>
      </div>
    )
  }
};

export const MerchDescription: Story = {
  render: () => {
    return (
      <div 
        style={{
          width: '1368px',
          height: '700px',
        }}
      >
        <ProductDescription variant="merch" product={merch}/>
      </div>
    )
  }
};