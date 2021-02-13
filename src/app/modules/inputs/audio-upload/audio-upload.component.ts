import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { UploadService } from './services/upload.service';
@Component({
  selector: 'app-audio-upload',
  templateUrl: './audio-upload.component.html',
  styleUrls: ['./audio-upload.component.scss'],
})
export class AudioUploadComponent implements OnInit {
  isUploaded: boolean;
  @Output() showOutput = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog, public uploadService: UploadService) {}

  ngOnInit(): void {}

  public openUploadDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      height: '50%',
    });

    this.showOutput.emit(false);

    dialogRef.afterClosed().subscribe((data) => {
      if (data.data) {
        this.showOutput.emit(true);
      }
    });
  }
}
