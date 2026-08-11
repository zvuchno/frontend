import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import TrackCard from "./TrackCard";

const meta: Meta<typeof TrackCard> = {
  title: 'entities/TrackCard',
  component: TrackCard,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof TrackCard>;

export const TrackCardWithPrice: Story = {
  render: () => {
    return (
      <div style={{
        width: '980px',
        height: '200px',
        padding: '20px',
      }}>
        <TrackCard
          image="https://img.freepik.com/free-photo/musician-playing-electric-guitar_23-2151414264.jpg" 
          title="Заголовок" 
          description="Описание" 
          duration={null}
          price={1000} 
          onDelete={() => console.log('delete')} 
          onEdit={() => console.log('edit')}
        />
      </div>
    )
  }
};

export const TrackCardWithDuration: Story = {
  render: () => {
    return (
      <div style={{
        width: '980px',
        height: '200px',
        padding: '20px',
      }}>
        <TrackCard
          image="https://img.freepik.com/free-photo/musician-playing-electric-guitar_23-2151414264.jpg" 
          title="Заголовок" 
          description="Описание" 
          duration={3526} 
          onDelete={() => console.log('delete')} 
          onEdit={() => console.log('edit')}
        />
      </div>
    )
  }
};