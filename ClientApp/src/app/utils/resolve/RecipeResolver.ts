import {Injectable} from "@angular/core";
import {Recipe} from "../../model/recipe";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {EMPTY, Observable} from "rxjs";
import {RecipeService} from "../../services/recipe.service";

@Injectable({providedIn: 'root'})
export class RecipeResolver implements Resolve<Recipe> {
  constructor(private service: RecipeService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe> | Promise<Recipe> | Recipe {
    let id = route.paramMap.get('id')
    if (!id) return EMPTY;
    return this.service.getRecipe(Number.parseInt(id));
  }
}
