import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Accordion } from './Accordion';
import CardArtist from '@/entities/Artist/ui/CardArtist/CardArtist';

const defaultAccordionLabel: ReactNode = <CardArtist></CardArtist>

const contentItems: string[] = [
  'Как только услышал о проекте «Звучно», сразу побежал к ним в предложку. Боялся, что уже весь мир инди-рока там, а я проворонил новую молодëжную движуху! Оказалось, я им вообще первый написал и это для меня и для них оказался первый опыт.',
  'Очень приветливые эти ребята из «Звучно». Чуткие и пунктуальные, приятно с ними иметь дело. Да и в целом крутые чуваки с крутыми идеями и стилем! ',
  'Прикиньте только, они индустрию перевернуть хотят! Понимание взаимодействия с артистом в стране вообще изменить! Такие темы я очень уважаю, поэтому рад, что наш музыкальный проект приобщился к данной платформе. Надеюсь, что скоро весь мир ахнет от силы низовой самоорганизации!',
  ''
];

const content: ReactNode = contentItems.map((item, index) => (
  <p key={index}>{item}</p>
));

const meta: Meta<typeof Accordion> = {
  title: 'shared/ui/Accordion',
  component: Accordion,
  args: {
    label: defaultAccordionLabel,
    children: content,
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <div style={{backgroundColor: '#b9b9b9', padding: '20px', margin: '0 auto', height: '100vw'}}>
          <Story/>;
        </div>
      </>
    )
  ]
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  }
};
