enum Visibility {
  Public = "public",
  LinkOnly = "link_only",
  Hidden = "hidden"
}

type TAlbum = {
  id: number
  name: string;
  price: number | null;
  description: string;
  cover_image: string | null;
  // visibility: Visibility;
  // is_published: boolean;
};

export interface ListAlbumsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TAlbum[];
};