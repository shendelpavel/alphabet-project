import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EMAIL_PATTERN_REGEX } from 'src/app/registration/regular-expressions';
import { EmailExistenceValidator } from 'src/app/registration/validators/email-existence.validator';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'dialog-add-parent',
  templateUrl: './dialog-add-parent.html',
})
export class DialogAddParent {
  public parentForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAddParent>,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.parentForm = this.formBuilder.group(
      {
        email: [
          '',
          [Validators.required, Validators.pattern(EMAIL_PATTERN_REGEX)],
        ],
      },
      {
        validator: EmailExistenceValidator(
          'email',
          this.dataService.getUserData
        ),
      }
    );
  }

  public checkControlErrors(controlName: string): boolean {
    const control: FormControl = this.parentForm.get(
      controlName
    ) as FormControl;
    return control.invalid && control.touched;
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
