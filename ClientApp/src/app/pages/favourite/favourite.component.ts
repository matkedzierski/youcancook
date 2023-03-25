import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {FavouriteService} from "../../services/favourite.service";
import {LoaderService} from "../../services/loader.service";
import {SnackService} from "../../services/snack.service";
import {LogService} from "../../services/log.service";

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  recipes?: Recipe[];
  isLoading = true;

  constructor(public favouriteService: FavouriteService,
              public loader: LoaderService,
              public log: LogService,
              public snack: SnackService) {
    loader.start();
    favouriteService.getFavourites().subscribe(r => {
      this.recipes = r;
      loader.stop();
    })
  }

  ngOnInit(): void {
  }


  toggleFavourite(recipe: Recipe) {
    this.favouriteService.toggleFavourite(recipe).subscribe({
      next: () => {
        if (!recipe.isFavourite) {
          this.recipes = this.recipes?.filter(r => r != recipe);
        }
      },
      error: e => {
        this.snack.showApiError(e);
        this.log.error(e);
      }
    });
  }
}
