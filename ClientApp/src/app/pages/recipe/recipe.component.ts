import {AfterViewInit, Component, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {Difficulty} from "../../model/difficulty.enum";
import {RecipeService} from "../../services/recipe.service";
import {ActivatedRoute} from "@angular/router";
import {take} from "rxjs";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, AfterViewInit {
  @Input()
  recipe: Recipe = new Recipe();
  difficulties = Object.values(Difficulty);
  diffValues = {
    easy: "Łatwy",
    medium: "Średni",
    hard: "Trudny"
  }
  constructor(public recipeService: RecipeService,
              public activatedRoute: ActivatedRoute,
              private _ngZone: NgZone) { }

  @ViewChild('autosize') autosize?: CdkTextareaAutosize;

  ngAfterViewInit() {
    this._ngZone.onStable.subscribe(() => this.autosize?.resizeToFitContent(true));
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ recipe }) => {
      if(recipe){
        this.recipe = recipe;
      }
    })
  }

  saveRecipe(recipe: Recipe) {
    if(!recipe.id){
      this.recipeService.add(recipe).subscribe()
    } else {
      this.recipeService.update(recipe).subscribe()
    }
  }
}
