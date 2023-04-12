import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecipeImage} from "../../model/recipe-image";

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {

  @Input()
  images: RecipeImage[] = [];
  @Output()
  imagesChange = new EventEmitter<RecipeImage[]>();
  maxImages: number = 50;

  constructor() { }

  ngOnInit(): void {
  }

  addImage(image: RecipeImage) {
    image.order = this.images?.length;
    this.images?.push(image);
    this.imagesChange.next(this.images);
  }

  deleteImage(image: RecipeImage) {
    this.images = this.images?.filter(i => i != image);
    this.imagesChange.next(this.images);
  }
}
