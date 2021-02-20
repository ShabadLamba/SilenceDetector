import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConstantsServiceService } from 'src/app/shared/services/constants-service.service';
import { DialogRecordComponent } from './components/dialog-record/dialog-record.component';
import { UploadRecordService } from './services/upload-record.service';
@Component({
  selector: 'app-audio-record',
  templateUrl: './audio-record.component.html',
  styleUrls: ['./audio-record.component.scss'],
})
export class AudioRecordComponent implements OnInit {
  constructor(
    public uploadService: UploadRecordService,
    private http: HttpClient,
    private constantsService: ConstantsServiceService
  ) {}

  public files: Set<File> = new Set();

  isUploaded: any;

  @Output() showOutput = new EventEmitter<boolean>();
  @Output() showLoader = new EventEmitter<boolean>();
  isRecording = false;

  progress;

  fileAdded = false;
  uploadSuccessful = false;
  uploading = false;
  error = false;
  audioFile;
  @Input() uploadedOnce;

  ngOnInit(): void {
    this.constantsService.setuploadedOnce(false);
  }

  stoppedRecording(val) {
    this.isRecording = val;
    if (val) {
      this.showLoader.emit(false);
    }
  }

  setAudioBlobUrl(audioBlobUrl) {
    this.audioFile = audioBlobUrl;
    this.onFilesAdded();
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

    this.showOutput.emit(false);
    this.showLoader.emit(true);
    this.uploadRecordedAudio();
  }

  uploadRecordedAudio() {
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
            if (event instanceof HttpResponse) {
              console.log(event);
              this.constantsService.setOriginalURL(
                event.body['input_audio_url']
              );
              this.constantsService.setStitchedURL(
                event.body['stitched_audio_url']
              );

              this.constantsService.setApiData(event.body);
              this.constantsService.setuploadedOnce(true);
              this.uploading = false;
              this.showOutput.emit(true);
              this.showLoader.emit(false);
            }
          },
          (error) => {
            this.error = true;
            console.log(error.message);
            console.log('ERROR');
          }
        );
    }
  }
}
