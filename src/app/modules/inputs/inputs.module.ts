import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsComponent } from './inputs.component';
import { AudioUploadComponent } from './audio-upload/audio-upload.component';
import { AudioRecordComponent } from './audio-record/audio-record.component';
import { DialogComponent } from './audio-upload/components/dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UploadService } from './audio-upload/services/upload.service';
import { DialogRecordComponent } from './audio-record/components/dialog-record/dialog-record.component';
import { UploadRecordService } from './audio-record/services/upload-record.service';
import { RecorderComponent } from './audio-record/components/recorder/recorder.component';
@NgModule({
  declarations: [
    InputsComponent,
    AudioUploadComponent,
    AudioRecordComponent,
    DialogComponent,
    DialogRecordComponent,
    RecorderComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
  ],
  exports: [
    InputsComponent,
    AudioUploadComponent,
    AudioRecordComponent,
    DialogComponent,
  ],
  entryComponents: [DialogComponent],
  providers: [UploadService, UploadRecordService],
})
export class InputsModule {}
