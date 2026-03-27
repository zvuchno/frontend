type TCardVariant = 'profile' | 'catalog';

export interface ArtistDescriptionProps {
  variant: TCardVariant;
  description: string;
  title?: string;
}