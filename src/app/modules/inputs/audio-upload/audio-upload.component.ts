import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ConstantsServiceService } from 'src/app/shared/services/constants-service.service';
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
  @Output() showLoader = new EventEmitter<boolean>();

  constructor(
    public uploadService: UploadService,
    private http: HttpClient,
    private constantsService: ConstantsServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.constantsService.setuploadedOnce(false);
  }

  @ViewChild('file') file;
  public files: Set<File> = new Set();

  fileAdded = false;
  uploading = false;
  error = false;
  @Input() uploadedOnce;

  audioFile;

  addFiles() {
    this.showLoader.emit(false);
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
    this.showOutput.emit(false);
    this.showLoader.emit(true);
    this.uploadAudio();
    // this.audioFile = URL.createObjectURL(this.file.nativeElement.files[0]);
  }

  uploadAudio() {
    // set the component state to "uploading"
    this.uploading = true;

    this.http
      .request(this.uploadService.uploadWithoutProgress(this.files))
      .subscribe(
        (event) => {
          if (event instanceof HttpResponse) {
            console.log(event);
            this.constantsService.setOriginalURL(event.body['input_audio_url']);
            this.constantsService.setStitchedURL(
              event.body['stitched_audio_url']
            );
            this.uploading = false;
            this.constantsService.setApiData(event.body);
            this.constantsService.setuploadedOnce(true);
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
