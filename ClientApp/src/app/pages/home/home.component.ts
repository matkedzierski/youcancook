import { Component } from '@angular/core';
import {Recipe} from "../../model/recipe";
import {Category} from "../../model/category.enum";
import {Difficulty} from "../../model/difficulty.enum";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent {
  recipes?: Recipe[];
  testDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet ante non elit gravida porttitor. Integer posuere felis lorem, ac faucibus arcu commodo sed. Maecenas ullamcorper vulputate enim, sed euismod ante. In sed orci arcu. Aliquam at gravida lorem. Duis posuere porta sapien eget posuere. Morbi auctor nisi in est dignissim, non ornare est hendrerit. In nec dolor vel purus porta egestas eu porttitor enim. Donec egestas magna ac ligula posuere fermentum. Etiam tincidunt maximus efficitur. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.";

  constructor() {
    this.recipes = [];
    this.recipes.push({title: "Kotlety schabowe", difficulty: Difficulty.Easy, portions: 4, category: Category.MAIN_DISHES, preparationTimeMinutes: 10, description: this.testDescription, imageUrl: "https://cataas.com/cat?test=1"})
    this.recipes.push({title: "Zupka pomidoruwka", difficulty: Difficulty.Hard, portions: 8, category: Category.SOUPS, preparationTimeMinutes: 10, description: this.testDescription, imageUrl: "https://cataas.com/cat?test=2"})
    this.recipes.push({title: "Cesarz czy jakoś tak", difficulty: Difficulty.Easy, portions: 2, category: Category.SALADS, preparationTimeMinutes: 10, description: this.testDescription, imageUrl: "https://cataas.com/cat?test=3"})
    this.recipes.push({title: "Kanapki", difficulty: Difficulty.Easy, portions: 12, category: Category.MAIN_DISHES, preparationTimeMinutes: 10, description: this.testDescription, imageUrl: "https://cataas.com/cat?test=4"})
    this.recipes.push({title: "Taigatel z sosem jakimś", difficulty: Difficulty.Medium, portions: 4, category: Category.PASTA, preparationTimeMinutes: 10, description: this.testDescription, imageUrl: "https://cataas.com/cat?test=5"})
  }
}
