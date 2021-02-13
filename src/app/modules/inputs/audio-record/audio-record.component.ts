import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRecordComponent } from './components/dialog-record/dialog-record.component';
import { UploadRecordService } from './services/upload-record.service';
@Component({
  selector: 'app-audio-record',
  templateUrl: './audio-record.component.html',
  styleUrls: ['./audio-record.component.scss'],
})
export class AudioRecordComponent implements OnInit {
  isUploaded: any;

  @Output() showOutput = new EventEmitter<boolean>();

  constructor(
    public dialog: MatDialog,
    public uploadService: UploadRecordService
  ) {}

  ngOnInit(): void {}

  public openUploadDialog() {
    let dialogRef = this.dialog.open(DialogRecordComponent, {
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
