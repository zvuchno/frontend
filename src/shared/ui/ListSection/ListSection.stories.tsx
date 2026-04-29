import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ListSection from "./ListSection";

const meta: Meta<typeof ListSection> = {
  title: 'shared/ui/ListSection',
  component: ListSection,
  parameters: {
    layout: 'centred'
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListSection>;

export const ListSectionDefault: Story = {
  render: () => {
    return (
      <div 
        style={{
          width: '1448px',
          border: '2px solid #black',
          padding: '40px',
        }}
      >
        <ListSection title="Артисты" link="">
          <div 
            style={{
              width: '327px',
              height: '327px',
              backgroundColor: '#E4F1FF'
            }}
          />
          <div 
            style={{
              width: '327px',
              height: '327px',
              backgroundColor: '#E4F1FF'
            }}
          />
          <div 
            style={{
              width: '327px',
              height: '327px',
              backgroundColor: '#E4F1FF'
            }}
          />
          <div 
            style={{
              width: '327px',
              height: '327px',
              backgroundColor: '#E4F1FF'
            }}
          />
        </ListSection>
      </div>
    )
  }
};