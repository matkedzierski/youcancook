import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {Difficulty} from "../../model/difficulty.enum";
import {RecipeService} from "../../services/recipe.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @Input()
  recipe: Recipe = new Recipe();
  difficulties = Object.values(Difficulty);
  diffValues = {
    easy: "Łatwy",
    medium: "Średni",
    hard: "Trudny"
  }
  constructor(public recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  saveRecipe(recipe: Recipe) {
    if(!recipe.id){
      this.recipeService.add(recipe).subscribe()
    } else {
      this.recipeService.update(recipe).subscribe()
    }
  }
}
