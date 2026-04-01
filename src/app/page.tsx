import Image from "next/image";
import styles from "./page.module.css";
import { ApproveSection } from "@/widgets/landingArtist/ui/ApproveSection/ApproveSection";
import type { ArtistInfo } from "@/widgets/landingArtist/ui/ApproveSection/ApproveSection.types";

const artistInfo: ArtistInfo[] = [
  {
    image: 'https://img.freepik.com/free-photo/musician-playing-electric-guitar_23-2151414264.jpg',
    description: 'JEW3SS',
    content: [
      'Как только услышал о проекте «Звучно», сразу побежал к ним в предложку. Боялся, что уже весь мир инди-рока там, а я проворонил новую молодëжную движуху! Оказалось, я им вообще первый написал и это для меня и для них оказался первый опыт.',
      'Очень приветливые эти ребята из «Звучно». Чуткие и пунктуальные, приятно с ними иметь дело. Да и в целом крутые чуваки с крутыми идеями и стилем! ',
    ]
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Schwejk_cropped.jpg/1200px-Schwejk_cropped.jpg',
    description: 'ОДИН МАНУЛ',
    content: [
      'Как только услышал о проекте «Звучно», сразу побежал к ним в предложку. Боялся, что уже весь мир инди-рока там, а я проворонил новую молодëжную движуху! Оказалось, я им вообще первый написал и это для меня и для них оказался первый опыт.',
      'Очень приветливые эти ребята из «Звучно». Чуткие и пунктуальные, приятно с ними иметь дело. Да и в целом крутые чуваки с крутыми идеями и стилем! ',
      'Прикиньте только, они индустрию перевернуть хотят! Понимание взаимодействия с артистом в стране вообще изменить! Такие темы я очень уважаю, поэтому рад, что наш музыкальный проект приобщился к данной платформе. Надеюсь, что скоро весь мир ахнет от силы низовой самоорганизации!',
      ''
    ]
  },
  {
    image: 'https://cdnuploads.aa.com.tr/uploads/Contents/2024/03/23/thumbs_b_c_4e1dc3413e07d9708b3a82f4c626a220.jpg',
    description: 'САЛЮТ',
    content: [
      ''
    ]
  } 
];

export default function Home() {
  return (
    <div className={styles.page}>
      
      <main className={styles.main}>
        <ApproveSection artistInfo={artistInfo}/>     
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className={styles.intro}>
          <h1>To get started, edit the page.tsx file.</h1>
          <p>
            Looking for a starting point or more instructions? Head over to{" "}
          </p>
        </div>
        
      </main>
    </div>
  );
}
