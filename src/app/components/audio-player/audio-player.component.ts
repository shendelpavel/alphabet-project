import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit
} from "@angular/core";

import { AudioPlayerService } from "src/app/services/audio-player.service";

@Component({
  selector: "ap-audio-player",
  templateUrl: "./audio-player.component.html",
  styleUrls: [ "./audio-player.component.scss" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioPlayerComponent implements OnInit, OnChanges {
  @Input() public audio: string = "";
  public isPlaying: boolean = false;

  constructor(
    private readonly audioPlayerService: AudioPlayerService,
    private readonly cheangeDetectorRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.audioPlayerService.createPlayer(this.audio);

    this.audioPlayerService.currentIsPlaying$.subscribe(isPlaying => {
      this.isPlaying = isPlaying;
      this.cheangeDetectorRef.detectChanges();
    });
  }

  public play(): void {
    this.audioPlayerService.play();
  }

  public pause(): void {
    this.audioPlayerService.pause();
  }

  public ngOnChanges(): void {
    this.audioPlayerService.reloadAudio(this.audio);
  }
}
