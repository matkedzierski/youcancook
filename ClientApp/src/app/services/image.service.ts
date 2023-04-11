import {Injectable} from '@angular/core';
import {Recipe} from "../model/recipe";
import {RecipeImage} from "../model/recipe-image";
import {environment} from "../../environments/environment";

const imgPlaceholderUrl = '/assets/img/placeholder.png';
const baseUrl = `${environment.backendUrl}/Image`;
const baseUrlMulti = `${environment.backendUrl}/Images`;

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  getImageUrlOrContent(image?: RecipeImage) {
    if(image){
      if(image.id){
        return `${baseUrl}/${image.id}`;
      } else if(image.content) {
        return image.content;
      } else {
        return imgPlaceholderUrl;
      }
    }
    return imgPlaceholderUrl;
  }
  getImageUrl(recipe?: Recipe) {
    if(recipe && recipe.images && recipe.images.length > 0) {
      return `${baseUrl}/${recipe?.images[0]?.id}`;
    } else {
      return imgPlaceholderUrl;
    }
  }
}
