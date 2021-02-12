import { Component, OnInit } from '@angular/core';
import { ConstantsServiceService } from 'src/app/shared/services/constants-service.service';
import { RestApiService } from './../../shared/services/rest-api.service';
@Component({
  selector: 'app-outputs',
  templateUrl: './outputs.component.html',
  styleUrls: ['./outputs.component.scss'],
})
export class OutputsComponent implements OnInit {
  response_text: string;
  api_url = 'https://dev.imibot.ai/silence/helloworld';
  constructor(
    private restApi: RestApiService,
    private constantsService: ConstantsServiceService
  ) {}

  originalAudioUrl: string;
  stitchedAudioUrl: string;
  showAudioButtons = false;

  ngOnInit(): void {}

  getAudioUrls() {
    this.originalAudioUrl = this.constantsService.getOriginalURL();
    this.stitchedAudioUrl = this.constantsService.getStitchedURL();
    console.log(this.constantsService.getOriginalURL());
    console.log(this.constantsService.getStitchedURL());
    this.showAudioButtons = true;
  }

  openUrl(url) {
    window.open(url, '_blank');
  }
}
