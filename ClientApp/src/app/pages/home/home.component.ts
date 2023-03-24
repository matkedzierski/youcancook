import {Component} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {RecipeService} from "../../services/recipe.service";
import {AuthService} from "@auth0/auth0-angular";
import {FavouriteService} from "../../services/favourite.service";
import {LoaderService} from "../../services/loader.service";
import {SnackService} from "../../services/snack.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  recipes?: Recipe[];

  constructor(public recipeService: RecipeService,
              public favouriteService: FavouriteService,
              public auth: AuthService,
              public loader: LoaderService) {
    this.loader.start();
    recipeService.getAll().subscribe(recipes => {
      this.recipes = recipes;
      this.loader.stop();
    })
  }

  toggleFavourite(recipe: Recipe) {
    this.favouriteService.toggleFavourite(recipe);
  }
}
