import { Meta, StoryObj } from "@storybook/nextjs-vite";
import CardArtist from "./CardArtist";

const meta: Meta<typeof CardArtist> = {
  title: 'entities/CardArtist',
  component: CardArtist,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof CardArtist>;

export const DefaultCardArtist: Story = {
  render: () => {
    return (
      <CardArtist />
    )
  }
};

export const CardArtistWithImage: Story = {
  render: () => {
    return (
      <CardArtist
        image="https://img.freepik.com/free-photo/musician-playing-electric-guitar_23-2151414264.jpg"
      />
    )
  }
};

export const FullCardArtist: Story = {
  render: () => {
    return (
      <CardArtist
        image="https://img.freepik.com/free-photo/musician-playing-electric-guitar_23-2151414264.jpg"
        description="Один манул"
        onClick={() => console.log('Like')}
      />
    )
  }
}