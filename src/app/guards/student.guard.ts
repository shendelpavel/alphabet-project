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
export class StudentGuard implements CanActivate {
  constructor(private authentificateService: AuthentificateService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authentificateService.getRole() === 'student') {
      return true;
    } else {
      alert('You must be registered as a student to visit this page!');
      return false;
    }
  }
}
