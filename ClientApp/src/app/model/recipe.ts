import {Category} from "./category.enum";
import {Difficulty} from "./difficulty.enum";
import {RecipeImage} from "./recipe-image";

export class Recipe {
  id?: number;
  title?: string;
  isFavourite?: boolean;
  category?: Category;
  difficulty?: Difficulty = Difficulty.Hard;
  content?: string;
  shortDescription?: string;
  preparationTimeMinutes?: number = 10;
  portions?: number = 4;
  images: RecipeImage[] = [];
}
