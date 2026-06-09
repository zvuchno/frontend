import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Gallery from "./Gallery";

const meta: Meta<typeof Gallery> = {
  title: 'widgets/product/ui/components/Gallery',
  component: Gallery,
  parameters: {
    layout: 'centred'
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Gallery>;

const images = [
  'https://s0.rbk.ru/v6_top_pics/media/img/2/41/347645792821412.jpeg',
  'https://petbistro.ru/upload/medialibrary/89f/rkwkir1cf7k6jt9d6tp7xdtpg735mw6s.jpg',
  'https://img.freepik.com/premium-photo/portrait-dog-looking-away-field_1048944-23249037.jpg?semt=ais_hybrid&w=740',
  'https://img.freepik.com/free-photo/ai-generated-labrador-retriever-dog-picture_23-2150644660.jpg?semt=ais_hybrid&w=740',
]

export const GalleryDefault: Story = {
  render: () => {
    return (
      <div 
        style={{
          width: '1368px',
          height: '706px',
          padding: '40px 48px',
          border: '2px solid #000'
        }}
      >
        <Gallery images={images}/>
      </div>
    )
  }
}