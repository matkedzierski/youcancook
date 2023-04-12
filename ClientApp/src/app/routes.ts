import {HomeComponent} from "./pages/home/home.component";
import {FavouriteComponent} from "./pages/favourite/favourite.component";
import {EditRecipeComponent} from "./pages/edit-recipe/edit-recipe.component";
import {AuthGuard} from "@auth0/auth0-angular";
import {RecipeResolver} from "./utils/resolve/RecipeResolver";
import {ViewRecipeComponent} from "./pages/view-recipe/view-recipe.component";
import {MyComponent} from "./pages/my/my.component";
import {AboutComponent} from "./pages/about/about.component";
import {SupportComponent} from "./pages/support/support.component";
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'favourite',
    component: FavouriteComponent
  },
  {
    path: 'recipes/add',
    component: EditRecipeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recipes/edit/:id',
    component: EditRecipeComponent,
    canActivate: [AuthGuard],
    resolve: {
      recipe: RecipeResolver
    }
  },
  {
    path: 'recipes/view/:id',
    component: ViewRecipeComponent,
    resolve: {
      recipe: RecipeResolver
    }
  },
  {
    path: 'my',
    component: MyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'support',
    component: SupportComponent
  }
]
