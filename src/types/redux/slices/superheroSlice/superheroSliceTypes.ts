import type { Superhero } from "@/types";

export interface SuperheroSliceState {
  superheroes: Superhero[];
  count: number;
  isLoading: boolean;
  errors: string;
}

export interface ServerObject {
  count: number;
  results: Superhero[];
}
