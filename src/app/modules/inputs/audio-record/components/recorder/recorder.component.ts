import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RecordAudioService } from '../../services/record-audio.service';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss'],
})
export class RecorderComponent implements OnInit {
  ngOnInit(): void {}

  isRecording = false;
  @Output() isRecordingEvent = new EventEmitter<boolean>();
  @Output() audioFile = new EventEmitter<any>();

  recordedTime;
  blobUrl;

  constructor(
    private audioRecordingService: RecordAudioService,
    private sanitizer: DomSanitizer
  ) {
    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      );
      this.audioFile.emit(data);
    });
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.isRecordingEvent.emit(true);
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.isRecordingEvent.emit(false);
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
      this.isRecordingEvent.emit(false);
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }
}
