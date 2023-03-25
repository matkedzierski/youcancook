import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  confirm(msg: string): Observable<boolean>{
    return of(true);
  }

}
