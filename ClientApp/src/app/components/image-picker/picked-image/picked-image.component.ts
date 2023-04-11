import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecipeImage} from "../../../model/recipe-image";
import {ImageService} from "../../../services/image.service";

@Component({
  selector: 'app-picked-image',
  templateUrl: './picked-image.component.html',
  styleUrls: ['./picked-image.component.scss']
})
export class PickedImageComponent implements OnInit {

  @Input()
  image?: RecipeImage;
  @Output()
  delete = new EventEmitter<RecipeImage>();

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
  }

  getImageUrl(image?: RecipeImage) {
    return this.imageService.getImageUrlOrContent(image);
  }

  deleteImage(image?: RecipeImage) {
    if(image){
      this.delete.next(image);
    }
  }
}
