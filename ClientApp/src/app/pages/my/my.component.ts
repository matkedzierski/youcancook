import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {LoaderService} from "../../services/loader.service";
import {RecipeService} from "../../services/recipe.service";
import {ModalService} from "../../services/modal.service";
import {SnackService} from "../../services/snack.service";

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
              public snack: SnackService,
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
      if(result){
        this.recipeService.delete(recipe).subscribe({
          next: ()=> {
            this.snack.show("Przepis został usunięty!");
            this.recipes = this.recipes?.filter(r => r != recipe);
          }
        })
      }
    });
  }
}
