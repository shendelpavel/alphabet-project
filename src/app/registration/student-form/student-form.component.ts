import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit, HostListener } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { EmailInUseValidator } from '../validators/email-in-use.validator';
import { PasswordConfirmValidator } from '../validators/password-confirm.validator';
import { DialogAddParent } from './dialogs/add-parent/add-parent.component';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  readonly MIN_HORIZONTAL_STEPPER_SCREEN: number = 1440;
  readonly EMAIL_PATTERN_REGEX =
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  readonly PHONE_PATTERN_REGEX = /^\+?([0-9]{10,13})$/;

  private screenWidth: number = 0;
  private addedParents!: FormArray;

  public stepperOrientation: StepperOrientation = 'horizontal';
  public hidePassword = true;
  public hideConfirmPassword = true;
  public studentForm!: FormGroup;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.studentForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: [
          '',
          [Validators.required, Validators.pattern(this.EMAIL_PATTERN_REGEX)],
        ],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(this.PHONE_PATTERN_REGEX)],
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
  private onWindowResize(): void {
    this.screenWidth = window.innerWidth;
    this.setStepperOrientation();
  }

  private setStepperOrientation(): any {
    if (this.screenWidth < this.MIN_HORIZONTAL_STEPPER_SCREEN) {
      this.stepperOrientation = 'vertical';
    } else {
      this.stepperOrientation = 'horizontal';
    }
  }

  public get arrayOfParents(): FormArray {
    return this.studentForm.get('addedParents') as FormArray;
  }

  public checkControlErrors(controlName: string): boolean {
    let control: FormControl = this.studentForm.get(controlName) as FormControl;
    return control.invalid && control.touched;
  }

  public addParent(): void {
    const dialogRef = this.dialog.open(DialogAddParent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedParents = this.arrayOfParents;
        this.addedParents.push(result);
      }
    });
  }

  public editParent(index: number): void {
    const dialogRef = this.dialog.open(DialogAddParent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedParents = this.arrayOfParents;
        this.addedParents.at(index).patchValue(result.value);
      }
    });
  }

  public deleteParent(index: number): void {
    this.addedParents = this.arrayOfParents;
    this.addedParents.removeAt(index);
  }

  public resetForm(): void {
    this.addedParents = this.arrayOfParents;
    this.addedParents.clear();
    this.studentForm.reset();
  }

  public signUp(): void {
    delete this.studentForm.value.confirmPassword;
    this.dataService.setUserData(this.studentForm.value);
  }
}
