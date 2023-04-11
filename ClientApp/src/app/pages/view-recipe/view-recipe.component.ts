import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {ActivatedRoute} from "@angular/router";
import {ImageService} from "../../services/image.service";
import {Gallery, GalleryRef} from "ng-gallery";
import {map} from "rxjs";

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit {
  @Input()
  recipe: Recipe = new Recipe();
  constructor(public activatedRoute: ActivatedRoute, public imageService: ImageService, private gallery: Gallery) { }

  ngOnInit(): void {
    const galleryRef: GalleryRef = this.gallery.ref('gallery');

    this.activatedRoute.data.subscribe( (data) => {
      let recipe: Recipe = data.recipe;
      if(recipe){
        this.recipe = recipe;
        recipe.images.forEach(image => {
          let url = this.imageService.getImageUrlOrContent(image);
          galleryRef.addImage({src: url, thumb: url});
        });
        //new ImageItem({src: this.imageService.getImageUrlOrContent(i), type: ''});
      }
    })
  }

}
