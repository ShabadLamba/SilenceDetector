import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaveformsComponent } from './components/waveforms/waveforms.component';
import { TimestampsComponent } from './components/timestamps/timestamps.component';
import { FeaturesDashboardComponent } from './features-dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { EngeryGraphComponent } from './components/engery-graph/engery-graph.component';
import { AutocorrelationComponent } from './components/autocorrelation/autocorrelation.component';

@NgModule({
  declarations: [
    WaveformsComponent,
    TimestampsComponent,
    FeaturesDashboardComponent,
    EngeryGraphComponent,
    AutocorrelationComponent,
  ],
  imports: [CommonModule, MatButtonModule],
  exports: [
    FeaturesDashboardComponent,
    WaveformsComponent,
    TimestampsComponent,
    EngeryGraphComponent,
  ],
})
export class FeaturesDashboardModule {}
