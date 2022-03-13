import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { DialogCreateNewUserComponent } from "./registration-form/dialogs/create-new-user/dialog-create-new-user.component";
import { DialogInputComponent } from "./registration-form/dialogs/input/dialog-input.component";
import { RegistrationComponent } from "./registration.component";
import { RegistrationFormComponent } from "./registration-form/registration-form.component";


@NgModule({
  declarations: [
    RegistrationComponent,
    RegistrationFormComponent,
    DialogCreateNewUserComponent,
    DialogInputComponent
  ],
  imports: [ CommonModule, SharedModule ],
  exports: [
    RegistrationComponent,
    RegistrationFormComponent,
    DialogCreateNewUserComponent,
    DialogInputComponent
  ]
})
export class RegistrationModule {}
