import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoaderComponent} from "../components/dialogs/loader/loader.component";

const timeout = 100000;

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public dialog: MatDialog) { }

  start(){
    let s = this.dialog.open(LoaderComponent, {panelClass: 'dialog-transparent'});
    setTimeout(()=> {
      s.close();
    }, timeout)
  }

  stop(){
    this.dialog.closeAll();
  }
}
