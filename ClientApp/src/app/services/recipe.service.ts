import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Recipe} from "../model/recipe";
import {Observable} from "rxjs";

const baseUrl = `${environment.backendUrl}/Recipes`;

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(public http: HttpClient) {
  }

  public getAll(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(baseUrl)
  }

  public getFavourites(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(`${baseUrl}/Favourites`)
  }

  update(recipe: Recipe): Observable<Object> {
    console.log("service updating recipe", recipe);
    return this.http.put(baseUrl, recipe);
  }

  add(recipe: Recipe) {
    console.log("service adding recipe", recipe);
    return this.http.post(baseUrl, recipe)
  }
}
