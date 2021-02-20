import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ConstantsServiceService } from 'src/app/shared/services/constants-service.service';
import { RestApiService } from './../../shared/services/rest-api.service';

@Component({
  selector: 'app-outputs',
  templateUrl: './outputs.component.html',
  styleUrls: ['./outputs.component.scss'],
})
export class OutputsComponent implements OnInit, OnChanges {
  response_text: string;
  api_url = 'https://dev.imibot.ai/silence/helloworld';
  constructor(
    private restApi: RestApiService,
    private constantsService: ConstantsServiceService
  ) {}

  originalAudioUrl: string;
  stitchedAudioUrl: string;
  showAudioButtons = false;
  showOriginal = false;
  showStitched = false;

  @Input() outputReady;

  ngOnInit(): void {
    this.getAudioUrls();
    this.showOriginal = true;
    this.showStitched = true;
  }

  ngOnChanges(): void {
    this.getAudioUrls();
    this.showOriginal = true;
    this.showStitched = true;
  }

  getAudioUrls() {
    this.originalAudioUrl = this.constantsService.getOriginalURL();
    // 'https://silencedetect.s3.us-east-1.amazonaws.com/audio_e1f18699-c674-4d4a-8f64-74fe2d26ed7d_input.wav'; // this.constantsService.getOriginalURL();
    this.stitchedAudioUrl = this.constantsService.getStitchedURL();
    // 'https://silencedetect.s3.us-east-1.amazonaws.com/audio_7da4a097-1d71-4270-9234-d88ab93740d9_output.wav'; //this.constantsService.getStitchedURL();
    console.log(this.constantsService.getOriginalURL());
    console.log(this.constantsService.getStitchedURL());
    this.showAudioButtons = true;
  }

  showOriginalAudio() {
    this.showOriginal = true;
  }

  showStitchedAudio() {
    this.showStitched = true;
  }
  openUrl(url) {
    window.open(url, '_blank');
  }
}
