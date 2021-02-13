import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogPopService {
  constructor(public dialog: MatDialog) {}
  openDialog(component): Observable<any> {
    const dialogRef = this.dialog.open(component, {
      width: '50%',
      height: '50%',
    });

    return dialogRef.afterClosed();
  }
}
