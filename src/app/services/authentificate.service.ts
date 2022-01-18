import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';
import { AuthStatus } from './shared/auth-status';

@Injectable({ providedIn: 'root' })
export class AuthentificateService {
  private authStatus: AuthStatus = AuthStatus.Forbid;
  private userData: any;
  private isLoggedIn = new BehaviorSubject(false);
  currentIsLoggedIn$ = this.isLoggedIn.asObservable();
  private role = new BehaviorSubject('');
  currentRole = this.role.asObservable();
  private email = new BehaviorSubject('');
  currentEmail = this.email.asObservable();

  constructor(private dataService: DataService) {}

  public login(email: string, password: string): AuthStatus {
    const jsonUserData = this.checkEmail(email);
    if (jsonUserData) {
      this.userData = JSON.parse(jsonUserData);
      this.checkPassword(password);
      return this.authStatus;
    } else {
      this.authStatus = AuthStatus.Forbid;
      return this.authStatus;
    }
  }

  public setPassword(password: string): void {
    this.userData.password = password;
    this.allowLogIn();
  }

  public setLogOutStatus(): void {
    this.userData!.isLoggedIn = false;
    this.userData.role === 'parent'
      ? this.dataService.setParentData(this.userData)
      : this.dataService.setStudentData(this.userData);
  }

  public clearSessionData(): void {
    this.setStatus(false);
    this.setRole('');
    this.setEmail('');
  }

  public logOut() {
    this.setLogOutStatus();
    this.clearSessionData();
  }

  public getStatus(): boolean {
    return this.isLoggedIn.value;
  }

  public getRole(): string {
    return this.role.value;
  }

  public getEmail(): string {
    return this.email.value;
  }

  private checkEmail(email: string): string | null {
    const jsonUserData = this.dataService.getUserData(email);
    return jsonUserData;
  }

  private checkPassword(password: string): void {
    const dataPassword = this.userData.password;
    if (dataPassword) {
      if (password === dataPassword) {
        this.allowLogIn();
      } else {
        this.forbidLogIn();
      }
    } else {
      this.authStatus = AuthStatus.SetPassword;
    }
  }

  private allowLogIn(): void {
    this.setLogInStatus();
    this.setSessionData();
    this.authStatus = AuthStatus.Allow;
  }

  private forbidLogIn(): void {
    this.authStatus = AuthStatus.Forbid;
  }

  private setLogInStatus(): void {
    this.userData!.isLoggedIn = true;
    this.userData.role === 'parent'
      ? this.dataService.setParentData(this.userData)
      : this.dataService.setStudentData(this.userData);
  }

  private setSessionData(): void {
    this.setStatus(this.userData.isLoggedIn);
    this.setRole(this.userData.role);
    this.setEmail(this.userData.email);
  }

  private setStatus(isLoggedIn: boolean): void {
    this.isLoggedIn.next(isLoggedIn);
  }

  private setRole(role: string): void {
    this.role.next(role);
  }

  private setEmail(email: string): void {
    this.email.next(email);
  }
}
