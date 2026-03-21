import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ArtistDescription from "./ArtistDescription";

const meta: Meta<typeof ArtistDescription> = {
  title: 'widgets/artist',
  component: ArtistDescription,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof ArtistDescription>;

export const ArtistDescriptionWithTitle: Story = {
  render: () => {
    return (
      <ArtistDescription 
        title="Об исполнителе" 
        description="Летнее 'Выгорание' пройдет 9 и 10 августа в долгожданном и новом для нас формате городского open-air фестиваля на территории арт-кластера" 
      />
    )
  }
};

export const ArtistDescriptionWithoutTitle: Story = {
  render: () => {
    return (
      <ArtistDescription description="Летнее 'Выгорание' пройдет 9 и 10 августа" />
    )
  }
};

export const ArtistDescriptionExpanded: Story = {
  render: () => {
    return (
      <ArtistDescription 
        description="Летнее 'Выгорание' пройдет 9 и 10 августа в долгожданном и новом для нас формате городского open-air фестиваля на территории арт-кластера! Полноценная уличная сцена Summer Stage, 2 Live-сцены и одна электронная, а также лекторий, квесты, маркеты, фудкорт." 
      />
    )
  }
};