import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogSetPassword, LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, DialogSetPassword],
  imports: [CommonModule, SharedModule],
  exports: [LoginComponent, DialogSetPassword],
})
export class LoginModule {}
