import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { TopBarComponent } from './top-bar/top-bar.component';



@NgModule({
  declarations: [
    FooterComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    TopBarComponent
  ]
})
export class ComponentsModule { }
