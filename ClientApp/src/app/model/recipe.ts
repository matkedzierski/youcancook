import {Category} from "./category.enum";
import {Difficulty} from "./difficulty.enum";

export class Recipe {
  id?: number;
  title?: string;
  isFavourite?: boolean;
  category?: Category;
  difficulty?: Difficulty;
  content?: string;
  shortDescription?: string;
  preparationTimeMinutes?: number;
  portions?: number;
  imageUrl?: string;
}
