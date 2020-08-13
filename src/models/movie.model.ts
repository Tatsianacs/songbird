export interface Movie {
  id: string;
  firebaseId: string;
  themoviedbId: string;
  isTv?: boolean;
  imgPath?: string;
  urlPath?: string;
  themoviedbOverview?: string;
  themoviedbImagePath?: string;
  themoviedbTitle?: string;
  themoviedbOriginalTitle?: string;
}
