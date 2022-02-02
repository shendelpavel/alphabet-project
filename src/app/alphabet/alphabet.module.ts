import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AlphabetComponent } from './alphabet.component';

@NgModule({
  declarations: [AlphabetComponent],
  imports: [CommonModule, SharedModule],
  exports: [AlphabetComponent],
})
export class AlphabetModule {}
