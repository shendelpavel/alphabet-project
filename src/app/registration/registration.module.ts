import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RegistrationComponent } from './registration.component';
import { ParentFormComponent } from './parent-form/parent-form.component';
import { DialogAddNewStudent } from './parent-form/dialogs/add-new-student/add-new-student.component';
import { DialogAddExistingStudent } from './parent-form/dialogs/add-existing-student/add-existing-student.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { DialogAddParent } from './student-form/dialogs/add-parent/add-parent.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    ParentFormComponent,
    StudentFormComponent,
    DialogAddParent,
    DialogAddNewStudent,
    DialogAddExistingStudent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    RegistrationComponent,
    ParentFormComponent,
    StudentFormComponent,
    DialogAddParent,
    DialogAddNewStudent,
    DialogAddExistingStudent,
  ],
})
export class RegistrationModule {}
