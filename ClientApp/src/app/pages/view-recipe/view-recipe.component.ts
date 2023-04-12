import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {ActivatedRoute} from "@angular/router";
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit {
  recipe: Recipe = new Recipe();
  images:{image: string, thumbImage: string}[] = [];
  constructor(public activatedRoute: ActivatedRoute, public imageService: ImageService) { }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe( (data) => {
      this.recipe = data.recipe;
      if(this.recipe && this.recipe.images){
        this.recipe.images.forEach(image => {
          let url = this.imageService.getImageUrlOrContent(image);
          this.images.push({image: url, thumbImage: url})
        });
        //new ImageItem({src: this.imageService.getImageUrlOrContent(i), type: ''});
      }
    })
  }
}
