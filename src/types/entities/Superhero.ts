export interface Superhero {
  id: number;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  images: string[];
}

export interface SuperheroFormData
  extends Omit<Superhero, "id" | "superpowers" | "images"> {
  superpowers: string[];
  images: { url: string }[];
}
