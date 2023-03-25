import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDeleteComponent} from "../components/dialogs/confirm-delete/confirm-delete.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public dialog: MatDialog) {
  }

  confirm(msg: string): Observable<boolean> {
    return this.dialog
      .open(ConfirmDeleteComponent, {data: msg})
      .afterClosed();
  }

}
