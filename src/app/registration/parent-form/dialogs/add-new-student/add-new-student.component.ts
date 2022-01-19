import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  EMAIL_PATTERN_REGEX,
  PHONE_PATTERN_REGEX,
} from 'src/app/registration/regular-expressions';
import { DataService } from 'src/app/services/data.service';
import { EmailInUseValidator } from '../../../validators/email-in-use.validator';

@Component({
  selector: 'dialog-add-new-student',
  templateUrl: './dialog-add-new-student.html',
  styleUrls: ['./dialog-add-new-student.scss'],
})
export class DialogAddNewStudent {
  public newStudentForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAddNewStudent>,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.newStudentForm = this.formBuilder.group(
      {
        role: ['student'],
        isLoggedIn: [false],
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: [
          '',
          [Validators.required, Validators.pattern(EMAIL_PATTERN_REGEX)],
        ],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(PHONE_PATTERN_REGEX)],
        ],
        password: [''],
        addedParents: this.formBuilder.array([]),
      },
      {
        validator: [EmailInUseValidator('email', this.dataService.getUserData)],
      }
    );
  }

  public checkControlErrors(controlName: string): boolean {
    const control: FormControl = this.newStudentForm.get(
      controlName
    ) as FormControl;
    return control.invalid && control.touched;
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
