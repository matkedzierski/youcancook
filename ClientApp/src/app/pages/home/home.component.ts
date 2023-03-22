import { Component } from '@angular/core';
import {Recipe} from "../../model/recipe";
import {Category} from "../../model/category.enum";
import {Difficulty} from "../../model/difficulty.enum";
import {RecipeService} from "../../services/recipe.service";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent {
  recipes?: Recipe[];
  testDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet ante non elit gravida porttitor. Integer posuere felis lorem, ac faucibus arcu commodo sed. Maecenas ullamcorper vulputate enim, sed euismod ante. In sed orci arcu. Aliquam at gravida lorem. Duis posuere porta sapien eget posuere. Morbi auctor nisi in est dignissim, non ornare est hendrerit. In nec dolor vel purus porta egestas eu porttitor enim. Donec egestas magna ac ligula posuere fermentum. Etiam tincidunt maximus efficitur. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.";

  constructor(public service: RecipeService, public auth: AuthService) {
    service.getAll().subscribe(recipes => {
      this.recipes = recipes;
    })
  }
}
