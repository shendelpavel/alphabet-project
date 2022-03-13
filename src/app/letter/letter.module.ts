import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ComponentsModule } from "../components/components.module";
import { SharedModule } from "../shared/shared.module";

import { LetterComponent } from "./letter.component";

@NgModule({
  declarations: [ LetterComponent ],
  imports: [ CommonModule, SharedModule, ComponentsModule ],
  exports: [ LetterComponent ]
})
export class LetterModule {}
