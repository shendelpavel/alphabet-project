import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { AudioPlayerComponent } from "./audio-player/audio-player.component";
import { FooterComponent } from "./footer/footer.component";
import { TopBarComponent } from "./top-bar/top-bar.component";

@NgModule({
  declarations: [ FooterComponent, TopBarComponent, AudioPlayerComponent ],
  imports: [ CommonModule, SharedModule ],
  exports: [ FooterComponent, TopBarComponent, AudioPlayerComponent ]
})
export class ComponentsModule {}
