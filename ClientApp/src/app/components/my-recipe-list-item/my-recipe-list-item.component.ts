import {Component, Input, OnInit, Output} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {Category} from "../../model/category.enum";
import {Subject} from "rxjs";
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-my-recipe-list-item',
  templateUrl: './my-recipe-list-item.component.html',
  styleUrls: ['./my-recipe-list-item.component.scss']
})
export class MyRecipeListItemComponent implements OnInit {

  @Input()
  recipe?: Recipe;
  @Output()
  delete = new Subject<Recipe>();
  @Output()
  edit = new Subject<Recipe>();

  categoryNames: Map<Category, string> = new Map([
    [Category.MAIN_DISHES, "Dania główne"],
    [Category.SOUPS, "Zupy"],
    [Category.DESSERTS, "Desery"],
    [Category.PASTA, "Makarony"],
    [Category.PIZZA, "Pizza"],
    [Category.SALADS, "Sałatki"]
  ]);

  constructor(public imageService: ImageService) { }

  ngOnInit(): void {
  }

  getCategoryName(category: Category | undefined) {
    return this.categoryNames.get(category!);
  }

  editRecipe(event: MouseEvent) {
    if(this.recipe){
      this.edit.next(this.recipe);
    }
    event.stopPropagation();
  }

  deleteRecipe(event: MouseEvent) {
    if(this.recipe){
      this.delete.next(this.recipe);
    }
    event.stopPropagation();
  }

  getEditRoute(recipe?: Recipe) {
    if(recipe){
      return `/recipes/edit/${recipe.id}`;
    }
    return undefined;
  }

  getImageUrl(recipe?: Recipe) {
    return this.imageService.getImageUrl(recipe);
  }
}
