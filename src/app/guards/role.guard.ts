import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthentificateService } from '../services/authentificate.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private readonly authentificateService: AuthentificateService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = route.data['role'] as string;
    if (this.authentificateService.getRole() === role) {
      return true;
    } else {
      alert(`You must be registered as a ${role} to visit this page!`);
      return false;
    }
  }
}
