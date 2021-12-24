import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  private isLoggedIn = new BehaviorSubject(false);
  currentIsLoggedIn = this.isLoggedIn.asObservable();

  private role = new BehaviorSubject('');
  currentRole = this.role.asObservable();

  private email = new BehaviorSubject('');
  currentEmail = this.email.asObservable();

  setStatus(isLoggedIn: boolean) {
    this.isLoggedIn.next(isLoggedIn);
  }
  getStatus(): boolean {
    return this.isLoggedIn.value;
  }

  setRole(role: string) {
    this.role.next(role);
  }
  getRole(): string {
    return this.role.value;
  }

  setEmail(email: string) {
    this.email.next(email);
  }
  getEmail(): string {
    return this.email.value;
  }
}
