import { Superhero } from "@/types";

export interface CurrentSuperheroState {
  superhero: Superhero | null;
  isLoading: boolean;
  errors: string;
}
