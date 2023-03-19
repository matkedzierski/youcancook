import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../model/recipe";
import {Difficulty} from "../../model/difficulty.enum";
import {Category} from "../../model/category.enum";

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  recipes?: Recipe[];
  testDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet ante non elit gravida porttitor. Integer posuere felis lorem, ac faucibus arcu commodo sed. Maecenas ullamcorper vulputate enim, sed euismod ante. In sed orci arcu. Aliquam at gravida lorem. Duis posuere porta sapien eget posuere. Morbi auctor nisi in est dignissim, non ornare est hendrerit. In nec dolor vel purus porta egestas eu porttitor enim. Donec egestas magna ac ligula posuere fermentum. Etiam tincidunt maximus efficitur. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.";

  constructor() {
    this.recipes = [];
    this.recipes.push({title: "Kotlety schabowe", difficulty: Difficulty.Easy, portions: 4, category: Category.MAIN_DISHES, preparationTimeMinutes: 10, description: this.testDescription, imageUrl: "https://cataas.com/cat?test=1"})
    this.recipes.push({title: "Kanapki", difficulty: Difficulty.Easy, portions: 12, category: Category.MAIN_DISHES, preparationTimeMinutes: 10, description: this.testDescription, imageUrl: "https://cataas.com/cat?test=4"})
  }

  ngOnInit(): void {
  }

}
