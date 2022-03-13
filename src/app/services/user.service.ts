import { FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";

import { DataService } from "./data.service";
import { User } from "./shared/user.model";
import { forEach } from "lodash";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private readonly dataService: DataService){}

  public findUserByEmail(email: string): User | null {
    const userData = this.dataService.getUserData(email);
    if (userData) {
      return JSON.parse(userData);
    } else {
      return null;
    }
  }

  public registerUsers(newUsersList: User[], user: User & {confirmPassword: string} ): void {
    forEach(newUsersList, (newUserData) => {
      this.dataService.setUserData(newUserData);
    });
    const { confirmPassword, ...newUser } = user;
    this.dataService.setUserData(newUser);
  }
}