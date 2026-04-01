import type { Meta, StoryObj } from '@storybook/react-vite';
import { ApproveSection } from './ApproveSection';
import CardArtist from '@/entities/Artist/ui/CardArtist/CardArtist';

const narrowMainBlock: React.ReactNode = (<div style={{backgroundColor: '#c0eeb7', height: '100px', width: '200px'}}></div>);
const wideMainBlock: React.ReactNode = (<div style={{backgroundColor: '#b8e7e3', height: '200px', width: '1000px'}}></div>);

const content: string[] = [
  'Как только услышал о проекте «Звучно», сразу побежал к ним в предложку. Боялся, что уже весь мир инди-рока там, а я проворонил новую молодëжную движуху! Оказалось, я им вообще первый написал и это для меня и для них оказался первый опыт.',
  'Очень приветливые эти ребята из «Звучно». Чуткие и пунктуальные, приятно с ними иметь дело. Да и в целом крутые чуваки с крутыми идеями и стилем! ',
  'Прикиньте только, они индустрию перевернуть хотят! Понимание взаимодействия с артистом в стране вообще изменить! Такие темы я очень уважаю, поэтому рад, что наш музыкальный проект приобщился к данной платформе. Надеюсь, что скоро весь мир ахнет от силы низовой самоорганизации!',
  ''
];


const meta: Meta<typeof ApproveSection> = {
  title: 'widgets/landingArtist/ApproveSection',
  component: ApproveSection,
  args: {
    content: content,
    mainBlock: <CardArtist/>,
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <div style={{backgroundColor: '#b9b9b9', padding: '36px', height: '100vw', width: '1440px'}}>
          <Story/>
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

export const WithNarrowMainBlock: Story = {
  args: {
    mainBlock: narrowMainBlock,
  }
};

export const WithWideMainBlock: Story = {
  args: {
    mainBlock: wideMainBlock,
  }
};
