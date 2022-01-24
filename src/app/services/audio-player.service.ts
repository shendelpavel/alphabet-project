import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import WaveSurfer from 'wavesurfer.js';

@Injectable({ providedIn: 'root' })
export class AudioPlayerService {
  public wavesurfer?: WaveSurfer;

  private isPlaying = new BehaviorSubject(false);
  currentIsPlaying$ = this.isPlaying.asObservable();

  public createPlayer(audio: string) {
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#f44336',
      progressColor: '#673ab7',
      responsive: true,
      hideScrollbar: true,
      cursorWidth: 0,
      barHeight: 2,
      height: 60,
    });

    this.wavesurfer.load(audio);
    this.wavesurfer.on('finish', () => {
      this.wavesurfer?.stop();
      this.setPlayerStatus(false);
    });
  }

  public play() {
    this.wavesurfer?.play();
    this.setPlayerStatus(true);
  }

  public pause() {
    this.wavesurfer?.pause();
    this.setPlayerStatus(false);
  }

  public setPlayerStatus(isPlaying: boolean): void {
    this.isPlaying.next(isPlaying);
  }

  public reloadAudio(audio: string) {
    this.wavesurfer?.load(audio);
  }
}
