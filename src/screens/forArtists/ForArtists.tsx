import clsx from "clsx";

import { ApproveSection } from "@/widgets/ApproveSection";
//import { Roadmap } from "@/widgets/Roadmap";
//import { roadmapItems } from "@/widgets/Roadmap";
import { SectionFAQ } from "@/widgets/SectionFAQ";

import { FAQItemsForArtists } from "@/shared/constants";
import { artistInfo } from "@/shared/constants/mocks/mockArtistsInfo";

import styles from "./ForArtists.module.scss";
import { ForArtistsCareSection } from "./components/ForArtistsCareSection/ForArtistsCareSection";
import { ForArtistsComissionSection } from "./components/ForArtistsComissionSection/ForArtistsComissionSection";
import { ForArtistsHero } from "./components/ForArtistsHero/ForArtistsHero";
import { ForArtistsJoinBeta } from "./components/ForArtistsJoinBeta/ForArtistsJoinBeta";
//import { ForArtistsLookForSection } from "./components/ForArtistsLookForSection/ForArtistsLookForSection";
import { ForArtistsOptionsSection } from "./components/ForArtistsOptionsSection/ForArtistsOptionsSection";
import { ForArtistsTeamSection } from "./components/ForArtistsTeamSection/ForArtistsTeamSection";

export const ForArtists = () => (
  <>
    <section>
      <ForArtistsHero />
    </section>
    <section className={clsx(styles.mainSection)}>
      <ForArtistsCareSection />
      <ForArtistsOptionsSection />
      <ForArtistsComissionSection />
      {/*<ForArtistsLookForSection />*/}
      {/*<section className={clsx(styles.sectionArea, styles.fifthSection)}>
        <Roadmap title={"ты нам подойдешь, если:"} items={roadmapItems} />
      </section>*/}
      <ForArtistsTeamSection />
      <section className={clsx(styles.sectionArea, styles.sevenSection)}>
        <ForArtistsJoinBeta />
      </section>
      <section className={clsx(styles.sectionArea, styles.eightSection)}>
        <ApproveSection artistInfo={artistInfo} />
      </section>
      <section>
        <SectionFAQ title={"FAQ"} items={FAQItemsForArtists} />
      </section>
    </section>
  </>
);
