import {Category} from "./category.enum";
import {Difficulty} from "./difficulty.enum";

export class Recipe {
  title?: string;
  category?: Category;
  difficulty?: Difficulty;
  description?: string;
  preparationTimeMinutes?: number;
  portions?: number;
  imageUrl?: string;
}
