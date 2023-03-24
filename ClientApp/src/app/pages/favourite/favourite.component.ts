import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {FavouriteService} from "../../services/favourite.service";
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  recipes?: Recipe[];
  isLoading = true;

  constructor(public favouriteService: FavouriteService, public loader: LoaderService) {
    loader.start();
    favouriteService.getFavourites().subscribe(r => {
      this.recipes = r;
      loader.stop();
    })
  }

  ngOnInit(): void {
  }


  toggleFavourite(recipe: Recipe) {
    this.favouriteService.toggleFavourite(recipe);
    if (recipe.isFavourite) {
      this.recipes = this.recipes?.filter(r => r != recipe);
    }
  }
}
