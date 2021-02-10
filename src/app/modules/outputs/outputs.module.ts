import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutputsComponent } from './outputs.component';

@NgModule({
  declarations: [OutputsComponent],
  exports: [OutputsComponent],
  imports: [CommonModule],
})
export class OutputsModule {}
