import { Meta, StoryObj } from "@storybook/nextjs-vite";
import JoinSection from "./JoinSection";

const meta: Meta<typeof JoinSection> = {
  title: 'widgets/Main/JoinSection',
  component: JoinSection,
  parameters: {
    layout: 'centred'
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof JoinSection>;

export const JoinSectionDefault: Story = {
  render: () => {
    return (
      <div 
        style={{
          width: '1440px',
          height: '750px',
          border: '2px solid #black',
          padding: '36px',
          backgroundColor: '#b5b5b5',
        }}
      >
        <JoinSection link=""/>
      </div>
    )
  }
};