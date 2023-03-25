import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(public snackBar: MatSnackBar) { }

  show(msg: string, durationMs = 1500){
    this.snackBar.open(msg, '', {duration: durationMs, horizontalPosition: 'end' })
  }

  showApiError(msg = 'Błąd komunikacji z serwerem!', durationMs = 1500) {
    this.snackBar.open(msg, '', {duration: durationMs, horizontalPosition: 'end'})
  }
}
