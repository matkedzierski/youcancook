import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Recipe} from "../model/recipe";
import {map, Observable} from "rxjs";
import {LogService} from "./log.service";
import {LoaderService} from "./loader.service";

const baseUrl = `${environment.backendUrl}/Recipes`;

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(public http: HttpClient, public log: LogService, public loaderService: LoaderService) {
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

  getRecipe(id: number): Observable<Recipe> {
    let start = performance.now();
    this.loaderService.start();
    return this.http.get<Recipe>(`${baseUrl}/${id}`)
      .pipe(map(ret => {
        let time = Math.round(performance.now() - start);
        this.log.debug(`RecipeService::getRecipe, time=${time}ms`);
        this.loaderService.stop();
        return ret;
      }));
  }

  getMy(): Observable<Recipe[]> {
    let start = performance.now();
    return this.http.get<Recipe[]>(`${baseUrl}/My`)
      .pipe(map(ret => {
        let time = Math.round(performance.now() - start);
        this.log.debug(`RecipeService::getMy, time=${time}ms, count=${ret.length}`);
        return ret;
      }));
  }

  update(recipe: Recipe): Observable<Object> {
    let start = performance.now();
    return this.http.put(`${baseUrl}/${recipe.id}`, recipe)
      .pipe(map(ret => {
        let time = Math.round(performance.now() - start);
        this.log.debug(`RecipeService::update, time=${time}ms`);
        return ret;
      }));
  }

  delete(recipe: Recipe): Observable<Object> {
    let start = performance.now();
    return this.http.delete(`${baseUrl}/${recipe.id}`)
      .pipe(map(ret => {
        let time = Math.round(performance.now() - start);
        this.log.debug(`RecipeService::delete, time=${time}ms`);
        return ret;
      }));
  }

  add(recipe: Recipe): Observable<Recipe> {
    let start = performance.now();
    return this.http.post<Recipe>(baseUrl, recipe)
      .pipe(map(ret => {
        let time = Math.round(performance.now() - start);
        this.log.debug(`RecipeService::add, time=${time}ms`);
        return ret;
      }));
  }

}
