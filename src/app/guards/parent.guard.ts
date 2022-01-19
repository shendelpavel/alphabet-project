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
export class ParentGuard implements CanActivate {
  constructor(private authentificateService: AuthentificateService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authentificateService.getRole() === 'parent') {
      return true;
    } else {
      alert('You must be registered as a parent to visit this page!');
      return false;
    }
  }
}
