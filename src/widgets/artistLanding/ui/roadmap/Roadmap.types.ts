export type RoadmapItemSide = "left" | "right";

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  side?: RoadmapItemSide;
}

export interface RoadmapProps {
  title: string;
  items: RoadmapItem[];
  className?: string;
  autoAlternate?: boolean;
}
