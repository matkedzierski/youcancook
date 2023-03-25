import {Injectable} from '@angular/core';
import {map, Observable, throwError} from "rxjs";
import {Recipe} from "../model/recipe";
import {HttpClient} from "@angular/common/http";
import {LogService} from "./log.service";
import {environment} from "../../environments/environment";
import {SnackService} from "./snack.service";

const baseUrl = `${environment.backendUrl}/Recipes/Favourites`;

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(public http: HttpClient, public log: LogService, public snack: SnackService) {
  }

  getFavourites(): Observable<Recipe[]> {
    let start = performance.now();
    return this.http.get<Recipe[]>(baseUrl)
      .pipe(map(ret => {
        let time = Math.round(performance.now() - start);
        this.log.debug(`RecipeService::getFavourites, time=${time}ms, count=${ret.length}`);
        return ret;
      }));
  }

  addFavourite(id: number) {
    let start = performance.now();
    return this.http.post(`${baseUrl}/${id}`,'')
      .pipe(map(ret => {
        let time = Math.round(performance.now() - start);
        this.log.debug(`RecipeService::addFavourite, time=${time}ms`);
        return ret;
      }));
  }

  removeFavourite(id: number) {
    let start = performance.now();
    return this.http.delete(`${baseUrl}/${id}`)
      .pipe(map(ret => {
        let time = Math.round(performance.now() - start);
        this.log.debug(`RecipeService::removeFavourite, time=${time}ms`);
        return ret;
      }));
  }

  toggleFavourite(recipe: Recipe) {
    if (recipe.id)
      return (recipe.isFavourite ? this.removeFavourite(recipe.id) : this.addFavourite(recipe.id))
        .pipe(map(() => {
          if (recipe.isFavourite) {
            recipe.isFavourite = false;
            this.snack.show("Usunięto z ulubionych!")
          } else {
            recipe.isFavourite = true;
            this.snack.show("Dodano do ulubionych!")
          }
        }));
    return throwError(()=>{})
  }
}
