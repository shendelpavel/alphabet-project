import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MyTooltipComponent } from './my-tooltip.component';

@NgModule({
  declarations: [MyTooltipComponent],
  imports: [CommonModule, SharedModule],
  exports: [MyTooltipComponent],
})
export class MyTooltipModule {}
