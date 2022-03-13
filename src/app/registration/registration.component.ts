import { Component } from "@angular/core";

import { UserRole } from "../services/shared/user-role";

import { RegistrationByRoleService } from "./services/registration-by-role.service";

@Component({
  selector: "ap-registration",
  templateUrl: "./registration.component.html",
  styleUrls: [ "./registration.component.scss" ]
})
export class RegistrationComponent {
  public readonly STATUSES = [ UserRole.Parent, UserRole.Student ];
  
  public userRole?: UserRole;

  constructor(private readonly registrationByRoleService: RegistrationByRoleService) {}
  
  public setUserRole(): void {
    this.registrationByRoleService.setUserRole(this.userRole as UserRole);
  }
}
