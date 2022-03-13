import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";

import { UserRole } from "src/app/services/shared/user-role";

@Injectable({ providedIn: "root" })
export class RegistrationByRoleService {
  public userRole = UserRole.Parent
  public changedUserRole$ = new BehaviorSubject<UserRole>(this.userRole);

  public setUserRole(userRole: UserRole): void {
    this.userRole = userRole;
    this.updateUserRole();
  }

  private updateUserRole() {
    this.changedUserRole$.next(this.userRole);
  }
}