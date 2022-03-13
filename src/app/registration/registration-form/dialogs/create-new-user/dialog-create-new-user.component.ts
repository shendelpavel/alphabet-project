import { Component, Inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import {
  EMAIL_PATTERN_REGEX,
  PHONE_PATTERN_REGEX
} from "src/app/registration/regular-expressions";
import { DataService } from "src/app/services/data.service";
import { UserRole } from "src/app/services/shared/user-role";

import { EmailInUseValidator } from "../../../validators/email-in-use.validator";

interface DialogData {
  role: UserRole;
  email: string;
}

@Component({
  selector: "ap-dialog-create-new-user",
  templateUrl: "./dialog-create-new-user.html",
  styleUrls: [ "./dialog-create-new-user.scss" ]
})
export class DialogCreateNewUserComponent {
  public newUserForm!: FormGroup;

  constructor(
    public readonly dialogRef: MatDialogRef<DialogCreateNewUserComponent>,
    private readonly dataService: DataService,
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public readonly data?: DialogData
  ) {
    this.newUserForm = this.formBuilder.group(
      {
        role: data?.role,
        isLoggedIn: false,
        name: [ "", [ Validators.required ] ],
        lastName: [ "", [ Validators.required ] ],
        email: [
          data?.email || "",
          [ Validators.required, Validators.pattern(EMAIL_PATTERN_REGEX) ]
        ],
        phoneNumber: [
          "",
          [ Validators.required, Validators.pattern(PHONE_PATTERN_REGEX) ]
        ],
        password: "",
        addedParents: this.formBuilder.array([])
      },
      {
        validator: [ EmailInUseValidator("email", this.dataService.getUserData) ]
      }
    );
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
