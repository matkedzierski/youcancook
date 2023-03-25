import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {HomeComponent} from "./pages/home/home.component";
import {NavMenuComponent} from "./components/nav-menu/nav-menu.component";
import {RecipeListItemComponent} from "./components/recipe-list-item/recipe-list-item.component";
import {AuthGuard, AuthHttpInterceptor, AuthModule} from "@auth0/auth0-angular";
import {MatDividerModule} from "@angular/material/divider";
import {AboutComponent} from "./pages/about/about.component";
import {SupportComponent} from './pages/support/support.component';
import {FavouriteComponent} from './pages/favourite/favourite.component';
import {MyComponent} from './pages/my/my.component';
import {LevelBadgeComponent} from './components/recipe-list-item/level-badge/level-badge.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {environment} from "../environments/environment";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FavBadgeComponent} from './components/recipe-list-item/fav-badge/fav-badge.component';
import {LoaderComponent} from './components/loader/loader.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MyRecipeListItemComponent} from "./components/my-recipe-list-item/my-recipe-list-item.component";
import {RecipeResolver} from "./utils/resolve/RecipeResolver";
import {RecipeComponent} from "./pages/recipe/recipe.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AboutComponent,
    RecipeListItemComponent,
    MyRecipeListItemComponent,
    SupportComponent,
    FavouriteComponent,
    MyComponent,
    LevelBadgeComponent,
    RecipeComponent,
    FavBadgeComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    AuthModule.forRoot({
      domain: 'youcookit.eu.auth0.com',
      clientId: 'spieE5Jl78sHu9zwMlzZDC00fksUUnTv',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
      httpInterceptor: {
        allowedList: [{
          uri: `${environment.backendUrl}/*`,
          allowAnonymous: true,
          tokenOptions: {
            authorizationParams: {
              audience: "https://youcancook/",
              scope: 'recipes:read',
              redirect_uri: window.location.origin
            }
          }
        }],
      },
    }),
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'favourite', component: FavouriteComponent},
      {path: 'recipes/add', component: RecipeComponent, canActivate: [AuthGuard]},
      {
        path: 'recipes/edit/:id', component: RecipeComponent, canActivate: [AuthGuard],
        resolve: {recipe: RecipeResolver}
      },
      {path: 'recipes/view/:id', component: RecipeComponent},
      {path: 'my', component: MyComponent, canActivate: [AuthGuard]},
      {path: 'about', component: AboutComponent},
      {path: 'support', component: SupportComponent},
    ]),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    }, RecipeResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
