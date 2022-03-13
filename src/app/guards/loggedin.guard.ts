import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";

import { AuthentificateService } from "../services/authentificate.service";

@Injectable({
  providedIn: "root"
})
export class LoggedInGuard implements CanActivate {
  constructor(private readonly authentificateService: AuthentificateService) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return !this.authentificateService.getStatus();
  }
}
