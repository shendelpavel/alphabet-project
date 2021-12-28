import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { DialogSetPassword } from './components/set-password.component';

@NgModule({
  declarations: [LoginComponent, DialogSetPassword],
  imports: [CommonModule, SharedModule],
  exports: [LoginComponent, DialogSetPassword],
})
export class LoginModule {}
