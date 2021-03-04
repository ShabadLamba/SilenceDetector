import { Component, Input, OnInit } from '@angular/core';
import { formatDefaultLocale } from 'd3';
import { ConstantsServiceService } from 'src/app/shared/services/constants-service.service';

@Component({
  selector: 'app-features-dashboard',
  templateUrl: './features-dashboard.component.html',
  styleUrls: ['./features-dashboard.component.scss'],
})
export class FeaturesDashboardComponent implements OnInit {
  constructor(private constantsService: ConstantsServiceService) {}

  isActive = '';
  public data: { x_value: number; y_value: number }[] = [];
  // public stitchedAudioData: { x_value: number; y_value: number }[] = [];

  @Input() isOutputReady = false;

  ngOnInit(): void {
    this.formatData();
  }

  ngOnChanges(changes): void {
    if (changes.hasOwnProperty('isOutputReady')) {
      if (this.isOutputReady) {
        // this.formatData();
        this.isActive = '';
      }
    }
  }

  showFeatureComponent(value) {
    this.isActive = value;
    this.formatData();
  }

  formatData() {}

  updateData(val) {
    console.log(val);
    console.log(this.isActive);
    console.log(this.data);
    this.data = [];
    if (val === 'original') {
      if (this.isActive === 'energy') {
        for (
          let i = 0;
          i <
          this.constantsService.getApiData()['original_features']['frames']
            .length;
          i++
        ) {
          this.data.push({
            x_value: this.constantsService.getApiData()['original_features'][
              'frames'
            ][i],
            y_value: Math.abs(
              this.constantsService.getApiData()['original_features'][
                'log_energy_values'
              ][i]
            ),
          });
        }
      } else if (this.isActive === 'autocorrelation') {
        for (
          let i = 0;
          i <
          this.constantsService.getApiData()['original_features']['frames']
            .length;
          i++
        ) {
          this.data.push({
            x_value: this.constantsService.getApiData()['original_features'][
              'frames'
            ][i],
            y_value: Math.abs(
              this.constantsService.getApiData()['original_features'][
                'normalised_ac_values'
              ][i]
            ),
          });
        }
      }
    } else if (val === 'stitched') {
      if (this.isActive === 'energy') {
        for (
          let i = 0;
          i <
          this.constantsService.getApiData()['stitched_features']['frames']
            .length;
          i++
        ) {
          this.data.push({
            x_value: this.constantsService.getApiData()['stitched_features'][
              'frames'
            ][i],
            y_value: Math.abs(
              this.constantsService.getApiData()['stitched_features'][
                'log_energy_values'
              ][i]
            ),
          });
        }
      } else if (this.isActive === 'autocorrelation') {
        for (
          let i = 0;
          i <
          this.constantsService.getApiData()['stitched_features']['frames']
            .length;
          i++
        ) {
          this.data.push({
            x_value: this.constantsService.getApiData()['stitched_features'][
              'frames'
            ][i],
            y_value: Math.abs(
              this.constantsService.getApiData()['stitched_features'][
                'normalised_ac_values'
              ][i]
            ),
          });
        }
      }
    }
  }
}
