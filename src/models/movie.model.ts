export interface Movie {
  id: string;
  firebaseId: string;
  themoviedbId: string;
  urlPath?: string;
  isTv?: boolean;
  imgPath?: string;
  themoviedbOverview?: string;
  themoviedbImagePath?: string;
  themoviedbTitle?: string;
  themoviedbOriginalTitle?: string;
  themoviedbVote?: number;
  themoviedbYear?: string;
}
