import {Category} from "./category.enum";
import {Difficulty} from "./difficulty.enum";
import {RecipeImage} from "./recipe-image";

export class Recipe {
  id?: number;
  title?: string;
  isFavourite?: boolean;
  category: Category = Category.MAIN_DISHES;
  difficulty?: Difficulty = Difficulty.Hard;
  content?: string;
  shortDescription?: string;
  preparationTimeMinutes?: number;
  portions?: number;
  images: RecipeImage[] = [];
}
