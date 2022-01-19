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
import { PasswordConfirmValidator } from '../../validators/password-confirm.validator';
import { DialogAddParent } from './dialogs/add-parent/add-parent.component';
import {
  EMAIL_PATTERN_REGEX,
  PHONE_PATTERN_REGEX,
} from '../regular-expressions';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  readonly MIN_HORIZONTAL_STEPPER_SCREEN: number = 1440;

  public stepperOrientation: StepperOrientation = 'horizontal';
  public hidePassword = true;
  public hideConfirmPassword = true;
  public studentForm!: FormGroup;

  private screenWidth: number = 0;
  private addedParents!: FormArray;

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.studentForm = this.formBuilder.group(
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
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        addedParents: this.formBuilder.array([]),
      },
      {
        validator: [
          PasswordConfirmValidator('password', 'confirmPassword'),
          EmailInUseValidator('email', this.dataService.getUserData),
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

  public get parentsList(): FormArray {
    return this.studentForm.get('addedParents') as FormArray;
  }

  public checkControlErrors(controlName: string): boolean {
    const control: FormControl = this.studentForm.get(
      controlName
    ) as FormControl;
    return control.invalid && control.touched;
  }

  public addParent(): void {
    const dialogRef = this.dialog.open(DialogAddParent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedParents = this.parentsList;
        this.addedParents.push(result);
      }
    });
  }

  public editParent(index: number): void {
    const dialogRef = this.dialog.open(DialogAddParent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedParents = this.parentsList;
        this.addedParents.at(index).patchValue(result.value);
      }
    });
  }

  public deleteParent(index: number): void {
    this.addedParents = this.parentsList;
    this.addedParents.removeAt(index);
  }

  public resetForm(): void {
    this.addedParents = this.parentsList;
    this.addedParents.clear();
    this.studentForm.reset();
  }

  public signUp(): void {
    const { confirmPassword, ...newStudent } = this.studentForm.value;
    this.dataService.setStudentData(newStudent);
  }

  private setStepperOrientation(): void {
    if (this.screenWidth < this.MIN_HORIZONTAL_STEPPER_SCREEN) {
      this.stepperOrientation = 'vertical';
    } else {
      this.stepperOrientation = 'horizontal';
    }
  }
}
