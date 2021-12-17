import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { ParentFormComponent } from './parent-form/parent-form.component';
import {
  DialogAddParent,
  StudentFormComponent,
} from './student-form/student-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RegistrationComponent,
    ParentFormComponent,
    StudentFormComponent,
    DialogAddParent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    RegistrationComponent,
    ParentFormComponent,
    StudentFormComponent,
    DialogAddParent,
  ],
})
export class RegistrationModule {}
