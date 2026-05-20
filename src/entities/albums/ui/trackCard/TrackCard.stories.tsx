import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Trackcard from "./TrackCard";

const meta: Meta<typeof Trackcard> = {
  title: 'entities/TrackCard',
  component: Trackcard,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Trackcard>;

export const TrackCardWithPrice: Story = {
  render: () => {
    return (
      <div style={{
        width: '980px',
        height: '200px',
        padding: '20px',
      }}>
        <Trackcard
          image="https://img.freepik.com/free-photo/musician-playing-electric-guitar_23-2151414264.jpg" 
          title="Заголовок" 
          description="Описание" 
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
        <Trackcard
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