import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {RecipeImage} from "../../../model/recipe-image";

@Component({
  selector: 'app-pick-image',
  templateUrl: './pick-image.component.html',
  styleUrls: ['./pick-image.component.scss']
})
export class PickImageComponent implements OnInit {

  @ViewChild("input")
  input?: ElementRef<HTMLInputElement>;
  constructor() { }

  @Output()
  image = new EventEmitter<RecipeImage>();

  ngOnInit(): void {
  }

  fileUploaded() {
    const element = this.input?.nativeElement;
    const files = element?.files;
    if(element && files && files.length >0){
      for (let f of Array.from(files)){
        let newImg = new RecipeImage();
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = () => {
            newImg.content = e.target.result;
            this.image?.next(newImg);
          }
        }
        reader.readAsDataURL(f);
      }
      element.value = '';
    }
  }
}
