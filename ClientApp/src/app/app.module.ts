import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FetchDataComponent} from "./pages/fetch-data/fetch-data.component";
import {HomeComponent} from "./pages/home/home.component";
import {CounterComponent} from "./pages/counter/counter.component";
import {NavMenuComponent} from "./components/nav-menu/nav-menu.component";
import {RecipeListItemComponent} from "./components/recipe-list-item/recipe-list-item.component";
import {AuthModule} from "@auth0/auth0-angular";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    RecipeListItemComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    AuthModule.forRoot({
      domain: 'youcookit.eu.auth0.com',
      clientId: 'spieE5Jl78sHu9zwMlzZDC00fksUUnTv',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'counter', component: CounterComponent},
    ]),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
