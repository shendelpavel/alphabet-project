import { Component, OnInit, HostListener } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmailInUseValidator } from '../validators/email-in-use.validator';
import { PasswordConfirmValidator } from '../validators/password-confirm.validator';
import { DialogAddParent } from './components/add-parent.component';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  minHorizontalStepperScreen: number = 1440;
  verticalStepper: string = 'vertical';
  horizontalStepper: string = 'horizontal';
  stepperOrientation: any = this.horizontalStepper;
  screenWidth: any;

  hidePassword = true;
  hideConfirmPassword = true;

  phoneRegx = /^\+?([0-9]{10,13})$/;
  emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  studentForm!: FormGroup;

  addedParents!: FormArray;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) {
    this.studentForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(this.phoneRegx)],
        ],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        addedParents: this.formBuilder.array([]),
      },
      {
        validator: [
          PasswordConfirmValidator('password', 'confirmPassword'),
          EmailInUseValidator('email'),
        ],
      }
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
    if (this.screenWidth < this.minHorizontalStepperScreen) {
      this.stepperOrientation = this.verticalStepper;
    } else {
      this.stepperOrientation = this.horizontalStepper;
    }
  }

  get arrayOfParents(): FormArray {
    return this.studentForm.get('addedParents') as FormArray;
  }

  checkControlErrors(controlName: any) {
    let control: FormControl = this.studentForm.get(controlName) as FormControl;
    return control.invalid && control.touched;
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

  editParent(index: number): void {
    const dialogRef = this.dialog.open(DialogAddParent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedParents = this.arrayOfParents;
        this.addedParents.at(index).patchValue(result.value);
      }
    });
  }

  deleteParent(index: number): void {
    this.addedParents = this.arrayOfParents;
    this.addedParents.removeAt(index);
  }

  resetForm(): void {
    this.addedParents = this.arrayOfParents;
    this.addedParents.clear();
    this.studentForm.reset();
  }

  signUp() {
    delete this.studentForm.value.confirmPassword;
    const jsonData = JSON.stringify(this.studentForm.value);
    localStorage.setItem(this.studentForm.value['email'], jsonData);
  }
}
