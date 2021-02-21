import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import WaveSurfer from 'wavesurfer.js';
import * as WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import MediaSessionPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.mediasession.js';
import SpectrogramPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js';
import { ConstantsServiceService } from 'src/app/shared/services/constants-service.service';

@Component({
  selector: 'app-waveforms',
  templateUrl: './waveforms.component.html',
  styleUrls: ['./waveforms.component.scss'],
})
export class WaveformsComponent implements OnInit {
  wave: WaveSurfer = null;
  wave2: WaveSurfer = null;
  // url =
  //   'https://ia800508.us.archive.org/15/items/LoveThemeFromTheGodfather/02LoveThemeFromTheGodfather.mp3';
  // 'https://ia800508.us.archive.org/15/items/LoveThemeFromTheGodfather/02LoveThemeFromTheGodfather.mp3';
  stitchedUrl = '';
  originalUrl = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private constantsService: ConstantsServiceService
  ) {}

  ngOnInit(): void {
    this.onPreviewPressed();
    this.getAudioUrls();
  }

  getAudioUrls() {
    this.originalUrl = this.constantsService.getOriginalURL();
    // 'https://silencedetect.s3.us-east-1.amazonaws.com/audio_e1f18699-c674-4d4a-8f64-74fe2d26ed7d_input.wav'; // this.constantsService.getOriginalURL();
    this.stitchedUrl = this.constantsService.getStitchedURL();
    // 'https://silencedetect.s3.us-east-1.amazonaws.com/audio_7da4a097-1d71-4270-9234-d88ab93740d9_output.wav'; //this.constantsService.getStitchedURL();
    console.log(this.constantsService.getOriginalURL());
    console.log(this.constantsService.getStitchedURL());
    // this.showAudioButtons = true;
  }

  generateWaveform1(): void {
    Promise.resolve(null).then(() => {
      this.wave = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'white',
        progressColor: '#f6c863',
        barWidth: 3,
        plugins: [
          // TimelinePlugin.create({
          //   container: '#wave-timeline',
          // }),
          // MediaSessionPlugin.create({
          //   container: '#wave-timeline',
          // }),
          // RegionsPlugin.create({
          //   container: '#wave-timeline',
          // }),
        ],
      });

      this.wave.on('ready', () => {
        // this.wave.play();
        // this.wave.enableDragSelection({});
        this.wave.addRegion({
          start: 30, // time in seconds
          end: 60, // time in seconds
          color: 'hsla(100, 100%, 30%, 0.1)',
        });
      });
    });
  }

  generateWaveform2(): void {
    Promise.resolve(null).then(() => {
      this.wave2 = WaveSurfer.create({
        container: '#waveform2',
        waveColor: 'white',
        progressColor: '#f6c863',
        barWidth: 3,
        plugins: [
          // TimelinePlugin.create({
          //   container: '#wave-timeline2',
          // }),
          // MediaSessionPlugin.create({
          //   container: '#wave-timeline',
          // }),
          // RegionsPlugin.create({
          //   container: '#wave-timeline2',
          // }),
        ],
      });

      this.wave2.on('ready', () => {
        // this.wave2.play();
        // this.wave.enableDragSelection({});
        this.wave2.addRegion({
          start: 30, // time in seconds
          end: 60, // time in seconds
          color: 'hsla(100, 100%, 30%, 0.1)',
        });
      });
    });
  }

  onPreviewPressed(): void {
    if (!this.wave) {
      this.generateWaveform1();
    }
    if (!this.wave2) {
      this.generateWaveform2();
    }

    this.cdr.detectChanges();

    Promise.resolve().then(() => this.wave.load(this.originalUrl));

    Promise.resolve().then(() => this.wave2.load(this.stitchedUrl));
  }

  onPlayPressed(): void {
    this.wave.play();
  }

  onPlayPressedWave2(): void {
    this.wave2.play();
  }

  onStopPressed(): void {
    this.wave.stop();
  }

  onStopPressedWave2(): void {
    this.wave2.stop();
  }
}
