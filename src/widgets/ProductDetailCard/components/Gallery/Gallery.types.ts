type TImage = {
  id: number;
  image: string;
  is_main: boolean;
}

export interface GalleryProps {
  images: TImage[];
};