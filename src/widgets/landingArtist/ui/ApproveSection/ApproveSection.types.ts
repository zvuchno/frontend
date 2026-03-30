export type ArtistInfo = {
  image: string;
  description: string;
  content: string[];   
}

export type ApproveSectionProps = {
  className?: string;
  artistInfo: ArtistInfo[];
}  
