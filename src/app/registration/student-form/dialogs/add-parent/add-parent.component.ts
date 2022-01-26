import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMAIL_PATTERN_REGEX } from 'src/app/registration/regular-expressions';
import { EmailExistenceValidator } from 'src/app/registration/validators/email-existence.validator';
import { DataService } from 'src/app/services/data.service';
import { Parent } from 'src/app/services/shared/user.model';

interface DialogData {
  parent: Parent;
}

@Component({
  selector: 'dialog-add-parent',
  templateUrl: './dialog-add-parent.html',
})
export class DialogAddParent {
  public parentForm!: FormGroup;

  constructor(
    public readonly dialogRef: MatDialogRef<DialogAddParent>,
    private readonly dataService: DataService,
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public readonly data?: DialogData
  ) {
    this.parentForm = this.formBuilder.group(
      {
        email: [
          data?.parent.email || '',
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
