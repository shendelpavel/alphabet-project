import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LetterComponent } from './letter.component';
import { ComponentsModule } from '../components/components.module';
import { AudioPlayerComponent } from '../components/audio-player/audio-player.component';

@NgModule({
  declarations: [LetterComponent],
  imports: [CommonModule, SharedModule, ComponentsModule],
  exports: [LetterComponent],
})
export class LetterModule {}
