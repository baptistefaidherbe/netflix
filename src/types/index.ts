type FormValues = {
  email: string;
  password: string;
};

interface CartItem {
  Id: number;
  Video?: string;
  Title: string;
  Price: number;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string[];
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  Response: string;
  Images: string[];
  isRead: boolean;
}
