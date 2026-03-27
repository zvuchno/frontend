import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlayerUI } from './Player';

const meta: Meta<typeof PlayerUI> = {
  title: 'features/player',
  component: PlayerUI,
  args: {
  image: '/artist-image.png',
  title: 'Втюрилась',
  artistName: 'ДОРА',
  audioTrack: 'https://cs9-20v4.vkuseraudio.ru/s/v1/acmp/YYXp9PRxLc2NuG0RvWFUvT96lUULjeVoxXZVyWNjH_wtEzuT0w1NWR8I2b7E9bnMftpesWvmp14AcmMsykpXAkN75LecqAqy7rcOB7RC5A3iYxRXoXly4Emysoe-j4w8S3hd-Ad-ZphCtxrznNf4GdCtS_zzdpO_7riXFehpytdxVxZ1Zg.mp3?siren=1',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <div style={{ 'width': '1360px' }}>
          <Story />
        </div>
      </>
    ),
  ],
  };


export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  }
};

export const WithLongTitle: Story = {
  args: {
    title: 'Nocturne B-flat minor, Op. 9, No. 1',
    artistName: 'Frederic Chopin',
    audioTrack: 'https://fine.sunproxy.net/file/YVlGMWFTTXN3M0VjVThHdEhvZHd2aS9MK3pTZW9kcmVJR1MrOEp1aWlLQUc0aHdWQ1BDaHNQK1Z0UkRDc1o4NHRCdURhUWc1S2xtVkNJeUtPdjJtQ2JSTzdEazl6dUxCT0VRTzZPWll5ZkE9/Frederik_SHopen_-_Noktyurn_Si-Bemol_Minor_(TheMP3.Info).mp3'
  }
}

export const ShortContainer: Story = {
  args: {
    title: 'Impromptu No.4',
    artistName: 'Frederic Chopin',
    audioTrack: 'https://predanie.ru/uploads/ftp/shopen-frederik-fred/etyudy-opusy-22-29-36-43-51-60-66/04-fantaisie-impromptu-in-c-sharp-minor-op66-posth.mp3',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '760px' }}>
        <Story />
      </div>
    ),
  ],
}
  