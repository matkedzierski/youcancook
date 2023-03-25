import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {LoaderService} from "../../services/loader.service";
import {RecipeService} from "../../services/recipe.service";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent implements OnInit {
  recipes?: Recipe[];
  isLoading = true;

  constructor(public recipeService: RecipeService,
              public modal: ModalService,
              public loader: LoaderService) {
    loader.start();
    recipeService.getMy().subscribe(r => {
      this.recipes = r;
      loader.stop();
    })
  }

  ngOnInit(): void {
  }

  deleteRecipe(recipe: Recipe) {
    this.modal.confirm("Czy na pewno usunąć przepis?").subscribe(result => {
      this.recipeService.delete(recipe);
    });
  }
}
