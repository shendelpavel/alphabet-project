import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { LetterPositionComponent } from "./letter-position/letter-position.component";
import { NumberOfLettersComponent } from "./number-of-letters/number-of-letters.component";
import { TasksComponent } from "./tasks.component";

@NgModule({
  declarations: [
    TasksComponent,
    LetterPositionComponent,
    NumberOfLettersComponent
  ],
  imports: [ CommonModule, SharedModule ]
})
export class TasksModule {}
