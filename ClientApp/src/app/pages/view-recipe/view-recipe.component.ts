import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit {
  @Input()
  recipe: Recipe = new Recipe();
  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ recipe }) => {
      if(recipe){
        this.recipe = recipe;
      }
    })
  }

}
