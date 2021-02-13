import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UploadService } from '../../services/upload.service';
import { forkJoin } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ConstantsServiceService } from 'src/app/shared/services/constants-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public uploadService: UploadService,
    private http: HttpClient,
    private constantsService: ConstantsServiceService,
    private sanitizer: DomSanitizer
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
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
    console.log(this.file);
    this.fileAdded = true;
    this.audioFile = this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(this.file.nativeElement.files[0])
    );
    // this.audioFile = URL.createObjectURL(this.file.nativeElement.files[0]);
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

    this.http
      .request(this.uploadService.uploadWithoutProgress(this.files))
      .subscribe(
        (event) => {
          this.canBeClosed = false;
          this.dialogRef.disableClose = true;

          // Hide the cancel-button
          this.showCancelButton = false;
          if (event instanceof HttpResponse) {
            console.log(event);
            this.constantsService.setOriginalURL(event.body['input_audio_url']);
            this.constantsService.setStitchedURL(
              event.body['stitched_audio_url']
            );
            this.canBeClosed = true;
            this.dialogRef.disableClose = false;
            this.dialogRef.close({ data: true });
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
