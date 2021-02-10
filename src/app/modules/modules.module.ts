import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsModule } from './inputs/inputs.module';
import { OutputsModule } from './outputs/outputs.module';
import { ModulesComponent } from './modules.component';

@NgModule({
  declarations: [ModulesComponent],
  imports: [CommonModule, InputsModule, OutputsModule],
  exports: [ModulesComponent],
})
export class ModulesModule {}
