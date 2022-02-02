import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AudioPlayerService } from 'src/app/services/audio-player.service';

@Component({
  selector: 'audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioPlayerComponent implements OnInit {
  public isPlaying: boolean = false;
  @Input() audio: string = '';

  constructor(
    private readonly audioPlayerService: AudioPlayerService,
    private readonly cheangeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.audioPlayerService.createPlayer(this.audio);

    this.audioPlayerService.currentIsPlaying$.subscribe((isPlaying) => {
      this.isPlaying = isPlaying;
      this.cheangeDetectorRef.detectChanges();
    });
  }

  public play() {
    this.audioPlayerService.play();
  }

  public pause() {
    this.audioPlayerService.pause();
  }

  public ngOnChanges() {
    this.audioPlayerService.reloadAudio(this.audio);
  }
}
