import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SharedModule } from '../shared/shared.module';
import { AudioPlayerComponent } from './audio-player/audio-player.component';

@NgModule({
  declarations: [FooterComponent, TopBarComponent, AudioPlayerComponent],
  imports: [CommonModule, SharedModule],
  exports: [FooterComponent, TopBarComponent, AudioPlayerComponent],
})
export class ComponentsModule {}
