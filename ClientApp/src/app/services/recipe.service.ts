import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Recipe} from "../model/recipe";
import {map, Observable} from "rxjs";
import {LogService} from "./log.service";

const baseUrl = `${environment.backendUrl}/Recipes`;

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(public http: HttpClient, public log: LogService) {
  }

  getAll(): Observable<Recipe[]> {
    let start = performance.now();
    return this.http.get<Recipe[]>(baseUrl)
      .pipe(map(ret => {
        let time = Math.round(performance.now() - start);
        this.log.debug(`RecipeService::getAll, time=${time}ms, count=${ret.length}`);
        return ret;
      }));
  }

  getFavourites(): Observable<Recipe[]> {
    let start = performance.now();
    return this.http.get<Recipe[]>(`${baseUrl}/Favourites`)
      .pipe(map(ret => {
        let time = Math.round(performance.now() - start);
        this.log.debug(`RecipeService::getFavourites, time=${time}ms, count=${ret.length}`);
        return ret;
      }));
  }

  update(recipe: Recipe): Observable<Object> {
    let start = performance.now();
    return this.http.put(baseUrl, recipe)
      .pipe(map(ret => {
        let time = Math.round(performance.now() - start);
        this.log.debug(`RecipeService::update, time=${time}ms`);
        return ret;
      }));
  }


  //TODO remaining performance logging
  add(recipe: Recipe) {
    let start = performance.now();
    return this.http.post(baseUrl, recipe)
      .pipe(map(ret => {
        let time = Math.round(performance.now() - start);
        this.log.debug(`RecipeService::add, time=${time}ms`);
        return ret;
      }));
  }

  removeFavourite(id: number) {
    let start = performance.now();
    return this.http.delete(`${baseUrl}/Favourites?recipeId=${id}`, {})
      .pipe(map(ret => {
        let time = Math.round(performance.now() - start);
        this.log.debug(`RecipeService::removeFavourite, time=${time}ms`);
        return ret;
      }));
  }

  addFavourite(id: number) {
    let start = performance.now();
    return this.http.post(`${baseUrl}/Favourites?recipeId=${id}`, {})
      .pipe(map(ret => {
        let time = Math.round(performance.now() - start);
        this.log.debug(`RecipeService::addFavourite, time=${time}ms`);
        return ret;
      }));
  }

}
