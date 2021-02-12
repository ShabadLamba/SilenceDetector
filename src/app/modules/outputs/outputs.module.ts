import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutputsComponent } from './outputs.component';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [OutputsComponent],
  exports: [OutputsComponent],
  imports: [CommonModule, MatButtonModule],
})
export class OutputsModule {}
