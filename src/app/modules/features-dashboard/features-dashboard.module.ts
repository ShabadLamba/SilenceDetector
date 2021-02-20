import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaveformsComponent } from './components/waveforms/waveforms.component';
import { TimestampsComponent } from './components/timestamps/timestamps.component';
import { FeaturesDashboardComponent } from './features-dashboard.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    WaveformsComponent,
    TimestampsComponent,
    FeaturesDashboardComponent,
  ],
  imports: [CommonModule, MatButtonModule],
  exports: [
    FeaturesDashboardComponent,
    WaveformsComponent,
    TimestampsComponent,
  ],
})
export class FeaturesDashboardModule {}
