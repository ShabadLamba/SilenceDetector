import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsComponent } from './inputs.component';
import { AudioUploadComponent } from './audio-upload/audio-upload.component';
import { AudioRecordComponent } from './audio-record/audio-record.component';

@NgModule({
  declarations: [InputsComponent, AudioUploadComponent, AudioRecordComponent],
  imports: [CommonModule],
  exports: [InputsComponent, AudioUploadComponent, AudioRecordComponent],
})
export class InputsModule {}
