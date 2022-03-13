import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Injectable } from "@angular/core";

import { AuthentificateService } from "../services/authentificate.service";

@Injectable({
  providedIn: "root"
})
export class LoginGuard implements CanActivate {
  constructor(
    private readonly authentificateService: AuthentificateService,
    private readonly router: Router
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): true | UrlTree {
    if (this.authentificateService.getStatus()) {
      return true;
    } else {
      return this.router.parseUrl("/login");
    }
  }
}
