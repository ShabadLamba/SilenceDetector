import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UploadRecordService } from '../../services/upload-record.service';
import { forkJoin } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ConstantsServiceService } from 'src/app/shared/services/constants-service.service';

@Component({
  selector: 'app-dialog-record',
  templateUrl: './dialog-record.component.html',
  styleUrls: ['./dialog-record.component.scss'],
})
export class DialogRecordComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogRecordComponent>,
    public uploadService: UploadRecordService,
    private http: HttpClient,
    private constantsService: ConstantsServiceService
  ) {}

  ngOnInit(): void {}

  @ViewChild('file') file;
  public files: Set<File> = new Set();

  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  fileAdded = false;
  uploadSuccessful = false;
  uploading = false;
  error = false;

  audioFile;

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.audioFile.blob;
    // this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
    this.fileAdded = true;
  }

  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    this.progress = this.uploadService.upload(this.files);

    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(
      (end) => {
        // ... the dialog can be closed again...
        this.canBeClosed = true;
        this.dialogRef.disableClose = false;

        // ... the upload was successful...
        this.uploadSuccessful = true;

        // ... and the component is no longer uploading
        this.uploading = false;
      },
      (error) => {
        console.log('ERROR');
      }
    );
  }

  closeDialogWithProgress() {
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }

    // set the component state to "uploading"
    this.uploading = true;
    // const formData: FormData = new FormData();
    // formData.append('file', this.audioFile.blob, this.audioFile.title);
    console.log(this.audioFile);
    console.log(this.files);
    if (this.audioFile) {
      this.http
        .request(this.uploadService.uploadSoundBlob(this.audioFile))
        .subscribe(
          (event) => {
            this.canBeClosed = false;
            this.dialogRef.disableClose = true;

            // Hide the cancel-button
            this.showCancelButton = false;
            if (event instanceof HttpResponse) {
              console.log(event);
              this.constantsService.setOriginalURL(
                event.body['input_audio_url']
              );
              this.constantsService.setStitchedURL(
                event.body['stitched_audio_url']
              );
              this.canBeClosed = true;
              this.dialogRef.disableClose = false;
              this.dialogRef.close();
              this.uploading = false;
            }
          },
          (error) => {
            this.error = true;
            this.canBeClosed = true;
            this.dialogRef.disableClose = false;
            console.log(error.message);
            console.log('ERROR');
          }
        );
    }
  }

  disableDialogRef(value) {
    this.dialogRef.disableClose = value;
  }

  setAudioBlobUrl(audioBlobUrl) {
    this.audioFile = audioBlobUrl;
    this.onFilesAdded();
  }
}
