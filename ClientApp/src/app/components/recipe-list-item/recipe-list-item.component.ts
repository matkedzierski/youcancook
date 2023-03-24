import {Component, Input, OnInit, Output} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {Category} from "../../model/category.enum";
import {Subject} from "rxjs";

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.scss']
})
export class RecipeListItemComponent implements OnInit {

  @Input()
  recipe?: Recipe;
  @Output()
  favourite = new Subject<Recipe>();

  categoryNames: Map<Category, string> = new Map([
    [Category.MAIN_DISHES, "Dania główne"],
    [Category.SOUPS, "Zupy"],
    [Category.DESSERTS, "Desery"],
    [Category.PASTA, "Makarony"],
    [Category.PIZZA, "Pizza"],
    [Category.SALADS, "Sałatki"]
  ]);

  constructor() { }

  ngOnInit(): void {
  }

  getCategoryName(category: Category | undefined) {
    return this.categoryNames.get(category!);
  }

  addFavourite(event: MouseEvent) {
    if(this.recipe){
      this.favourite.next(this.recipe);
    }
    event.stopPropagation();
  }
}
