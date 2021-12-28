import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { PasswordConfirmValidator } from '../../validators/password-confirm.validator';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class StudentFormComponent implements OnInit {
  hidePassword = true;
  hideConfirmPassword = true;

  phoneRegx = /^\+?([0-9]{10,13})$/;

  studentForm!: FormGroup;

  addedParents!: FormArray;

  stepperOrientation: any = 'horizontal';

  public screenWidth: any;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) {
    this.studentForm = this.formBuilder.group(
      {
        role: ['student'],
        isLoggedIn: [false],
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(this.phoneRegx)],
        ],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        addedParents: this.formBuilder.array([]),
      },
      { validator: PasswordConfirmValidator('password', 'confirmPassword') }
    );
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.setStepperOrientation();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
    this.setStepperOrientation();
  }

  setStepperOrientation(): any {
    if (this.screenWidth < 1440) {
      this.stepperOrientation = 'vertical';
    } else {
      this.stepperOrientation = 'horizontal';
    }
  }

  get arrayOfParents(): FormArray {
    return this.studentForm.get('addedParents') as FormArray;
  }

  addParent(): void {
    const dialogRef = this.dialog.open(DialogAddParent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedParents = this.arrayOfParents;
        this.addedParents.push(result);
      }
    });
  }

  deleteParent(index: number): void {
    this.addedParents = this.arrayOfParents;
    this.addedParents.removeAt(index);
  }

  clearParents(): void {
    this.addedParents = this.arrayOfParents;
    this.addedParents.clear();
  }

  signUp() {
    const jsonData = JSON.stringify(this.studentForm.value);
    localStorage.setItem(this.studentForm.value['email'], jsonData);
  }
}

@Component({
  selector: 'dialog-add-parent',
  templateUrl: './additional-components/dialog-add-parent.html',
})
export class DialogAddParent {
  parentForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAddParent>,
    private formBuilder: FormBuilder
  ) {
    this.parentForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
