import { Meta, StoryObj } from "@storybook/nextjs-vite";
import SectionFAQ from "./SectionFAQ";

const meta: Meta<typeof SectionFAQ> = {
  title: 'app/components/SectionFAQ',
  component: SectionFAQ,
  parameters: {
    layout: 'centred'
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SectionFAQ>;

const questions = [
  {
    label: 'Когда запуск?',
    children: 'Если ты это читаешь, то бета уже в релизе. Полноценный релиз выкатим в следующем году',
  },
  {
    label: 'Ещё один стриминг?',
    children: 'Если ты это читаешь, то бета уже в релизе. Полноценный релиз выкатим в следующем году',
  },
  {
    label: 'А моя поддержка точно поступит артисту?',
    children: 'Если ты это читаешь, то бета уже в релизе. Полноценный релиз выкатим в следующем году',
  },
];

export const SectionFAQDefault: Story = {
  render: () => {
    return (
      <div 
        style={{
          width: '1000px',
          border: '2px solid #000',
          padding: '36px',
        }}
      >
        <SectionFAQ title="FAQ" items={questions}/>
      </div>
    )
  }
};