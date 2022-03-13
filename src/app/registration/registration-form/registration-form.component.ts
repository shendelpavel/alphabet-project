import { Component, HostListener, Input, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { StepperOrientation } from "@angular/cdk/stepper";

import { findIndex, isNil, remove } from "lodash";

import { DataService } from "src/app/services/data.service";
import { UserRole } from "src/app/services/shared/user-role";
import { UserService } from "src/app/services/user.service";

import { User } from "src/app/services/shared/user.model";

import { PasswordConfirmValidator } from "src/app/validators/password-confirm.validator";

import {
  EMAIL_PATTERN_REGEX,
  PHONE_PATTERN_REGEX
} from "../regular-expressions";
import { EmailInUseValidator } from "../validators/email-in-use.validator";
import { RegistrationByRoleService } from "../services/registration-by-role.service";

import { DialogCreateNewUserComponent } from "./dialogs/create-new-user/dialog-create-new-user.component";
import { DialogInputComponent } from "./dialogs/input/dialog-input.component";

@Component({
  selector: "ap-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: [ "./registration-form.component.scss" ]
})
export class RegistrationFormComponent implements OnInit {
  public userRole: UserRole = UserRole.Parent;

  public stepperOrientation: StepperOrientation = "horizontal";
  public hidePassword = true;
  public hideConfirmPassword = true;
  public registrationForm!: FormGroup;

  private readonly MIN_HORIZONTAL_STEPPER_SCREEN: number = 1440;
  private readonly SNACK_BAR_MESSAGE: string = "Sorry, but this user is already registered as a ";
  private readonly SNACK_BAR_CLOSE: string = "Ok";
  private readonly SNACK_BAR_HORIZONTAL_POSITION: MatSnackBarHorizontalPosition = "center";
  private readonly SNACK_BAR_VERTICAL_POSITION: MatSnackBarVerticalPosition = "top";

  private screenWidth: number = 0;
  private bindedUsers!: FormArray;
  private newUsersList: User[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly dataService: DataService,
    private readonly userService: UserService,
    private readonly registrationByRoleService: RegistrationByRoleService,
    private readonly formBuilder: FormBuilder
  ) {}

  public get bindingUsersList(): FormArray {
    return this.registrationForm.get("bindedUsers") as FormArray;
  }

  @HostListener("window:resize", [ "$event" ])
  public onWindowResize(): void {
    this.screenWidth = window.innerWidth;
    this.setStepperOrientation();
  }

  public ngOnInit(): void {
    this.registrationForm = this.buildForm();
    this.screenWidth = window.innerWidth;
    this.setStepperOrientation();
    this.registrationByRoleService.changedUserRole$.subscribe(userRole => {
      this.userRole = userRole;
      this.registrationForm.patchValue({role: userRole})
    });
  }

  public addUser(index?: number): void {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      data: {
        type: "email",
        title: "User binding",
        description: "Enter user email",
        inputData: !isNil(index) ? this.bindedUsers.at(index).value : ""
      }
    });
    dialogRef.afterClosed().subscribe(email => {
      if (email) {
        const userData = this.userService.findUserByEmail(email);
        userData
          ? this.addExistingUser(userData, index)
          : this.createNewUser(email, index);
      }
    });
  }

  public deleteUser(index: number): void {
    remove(this.newUsersList, {email: this.bindedUsers.at(index).value});
    this.bindedUsers = this.bindingUsersList;
    this.bindedUsers.removeAt(index);
  }

  public resetForm(): void {
    this.newUsersList = [];
    this.bindedUsers = this.bindingUsersList;
    this.bindedUsers.clear();
    this.registrationForm.reset();
  }

  public signUp(): void {
    this.userService.registerUsers(this.newUsersList, this.registrationForm.value);
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group(
      {
        role: UserRole.Parent,
        isLoggedIn: false,
        name: [ "", [ Validators.required ] ],
        lastName: [ "", [ Validators.required ] ],
        email: [
          "",
          [ Validators.required, Validators.pattern(EMAIL_PATTERN_REGEX) ]
        ],
        phoneNumber: [
          "",
          [ Validators.required, Validators.pattern(PHONE_PATTERN_REGEX) ]
        ],
        password: [ "", [ Validators.required ] ],
        confirmPassword: [ "", [ Validators.required ] ],
        bindedUsers: this.formBuilder.array([])
      },
      {
        validator: [
          PasswordConfirmValidator("password", "confirmPassword"),
          EmailInUseValidator("email", this.dataService.getUserData)
        ]
      }
    );
  }

  private setStepperOrientation(): void {
    if (this.screenWidth < this.MIN_HORIZONTAL_STEPPER_SCREEN) {
      this.stepperOrientation = "vertical";
    } else {
      this.stepperOrientation = "horizontal";
    }
  }

  private addExistingUser(userData: User, index?: number): void {
    if (!isNil(index)) {
      remove(this.newUsersList, {email: this.bindedUsers.at(index).value});
    }
    this.bindUser(userData, index);
  }

  private createNewUser(email: string, index?: number): void {
    const dialogRef = this.dialog.open(DialogCreateNewUserComponent, {
      data: {
        role: this.userRole === UserRole.Parent
          ? UserRole.Student
          : UserRole.Parent,
        email
      }
    });
    dialogRef.afterClosed().subscribe(newUserData => {
      if (newUserData) {
        this.addToNewUsersList(newUserData);
        this.bindUser(newUserData, index);
      }
    });
  }

  private addToNewUsersList(newUserData: User): void {
    const index = findIndex(this.newUsersList, { email: newUserData.email});
    index >= 0 ? this.newUsersList[index] = newUserData : this.newUsersList.push(newUserData);
  }
//TODO
  private bindUser(addedUser: User, index?: number){
    if (this.userRole === addedUser.role) {
      return this.snackBar.open(this.SNACK_BAR_MESSAGE + this.userRole, this.SNACK_BAR_CLOSE, {
        horizontalPosition: this.SNACK_BAR_HORIZONTAL_POSITION,
        verticalPosition: this.SNACK_BAR_VERTICAL_POSITION
      });
    }
    this.bindedUsers = this.bindingUsersList;
    return !isNil(index)
      ? this.bindedUsers.at(index).patchValue(addedUser.email)
      : this.bindedUsers.push(new FormControl(addedUser.email));
  }
}
