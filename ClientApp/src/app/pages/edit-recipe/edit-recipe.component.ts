import {AfterContentInit, AfterViewInit, Component, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {Difficulty} from "../../model/difficulty.enum";
import {RecipeService} from "../../services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {SnackService} from "../../services/snack.service";
import {Category} from "../../model/category.enum";
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit, AfterViewInit {
  @Input()
  recipe: Recipe = new Recipe();
  difficulties = Object.values(Difficulty);
  diffValues = {
    easy: "Łatwy",
    medium: "Średni",
    hard: "Trudny"
  }

  categories = Object.values(Category);

  categoryNames: Map<string, string> = new Map([
    [Category.MAIN_DISHES.valueOf(), "Dania główne"],
    [Category.SOUPS.valueOf(), "Zupy"],
    [Category.DESSERTS.valueOf(), "Desery"],
    [Category.PASTA.valueOf(), "Makarony"],
    [Category.PIZZA.valueOf(), "Pizza"],
    [Category.SALADS.valueOf(), "Sałatki"]
  ]);

  constructor(public recipeService: RecipeService,
              public activatedRoute: ActivatedRoute,
              public snack: SnackService,
              public router: Router,
              public loader: LoaderService,
              private _ngZone: NgZone) {
  }

  @ViewChild('autosize') autosize?: CdkTextareaAutosize;

  ngAfterViewInit() {
    this._ngZone.onStable.subscribe(() => this.autosize?.resizeToFitContent(true));
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({recipe}) => {
      if (recipe) {
        this.recipe = recipe;
      }
    })
  }

  saveRecipe(recipe: Recipe) {
    this.loader.start();
    if (!recipe.id) {
      this.recipeService.add(recipe)
        .subscribe({
          next: async (created: Recipe) => {
            this.snack.show("Pomyślnie dodano przepis!");
            await this.router.navigate(['/recipes/view', created.id]);
            this.loader.stop();
          }
        });
    } else {
      this.recipeService.update(recipe).subscribe({
        next: async () => {
          this.snack.show("Pomyślnie zapisano przepis!");
          await this.router.navigate(['/recipes/view', recipe.id]);
          this.loader.stop();
        }
      });
    }
  }

  validateInteger(e: any) {
    const charCode = e.which ? e.which : e.keyCode;
    return charCode != 189 && charCode != 188;
  }
}
