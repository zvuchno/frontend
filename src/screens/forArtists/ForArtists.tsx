import clsx from "clsx";
import Link from "next/link";

import { ApproveSection } from "@/widgets/ApproveSection";
import { Roadmap } from "@/widgets/Roadmap";
import { roadmapItems } from "@/widgets/Roadmap";
import { SectionFAQ } from "@/widgets/SectionFAQ";

import { FAQItemsForArtists } from "@/shared/constants";
import { artistInfo } from "@/shared/constants/mocks/mockArtistsInfo";
import { AccentContainer, ButtonUI, DescriptionArea } from "@/shared/ui";

import styles from "./ForArtists.module.scss";
import { ForArtistsCareSection } from "./components/ForArtistsCareSection/ForArtistsCareSection";
import { ForArtistsComissionSection } from "./components/ForArtistsComissionSection/ForArtistsComissionSection";
import { ForArtistsHero } from "./components/ForArtistsHero/ForArtistsHero";
import { ForArtistsLookForSection } from "./components/ForArtistsLookForSection/ForArtistsLookForSection";
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
      <ForArtistsLookForSection />
      <section className={clsx(styles.sectionArea, styles.fifthSection)}>
        <Roadmap title={"ты нам подойдешь, если:"} items={roadmapItems} />
      </section>
      <ForArtistsTeamSection />
      <section className={clsx(styles.sectionArea, styles.sevenSection)}>
        <AccentContainer>
          <DescriptionArea headerwithIcons={true} colorOption={"grey"}>
            <div className={styles.content}>
              <span>Присоединиться к бете</span>
              <ButtonUI variant={"accentDark"} size='large'>
                <Link href={"/role"} prefetch={false}>
                  присоединиться
                </Link>
              </ButtonUI>
            </div>
          </DescriptionArea>
        </AccentContainer>
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
