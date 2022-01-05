import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';
import { User } from './shared/user.model';
type AuthStatus = 'allow' | 'forbid' | 'setPassword';

@Injectable()
export class AuthentificateService {
  private authStatus: AuthStatus = 'forbid';
  private userData!: User;
  private isLoggedIn = new BehaviorSubject(false);
  currentIsLoggedIn = this.isLoggedIn.asObservable();
  private role = new BehaviorSubject('');
  currentRole = this.role.asObservable();
  private email = new BehaviorSubject('');
  currentEmail = this.email.asObservable();

  constructor(private dataService: DataService) {}

  private checkEmail(email: string): string | null {
    const jsonUserData = this.dataService.getUserData(email);
    return jsonUserData;
  }

  private checkPassword(password: string, hasPassword: boolean): void {
    const dataPassword = this.userData.password;
    if (dataPassword || hasPassword) {
      if (password === dataPassword) {
        this.allowLogIn();
      } else {
        this.forbidLogIn();
      }
    } else {
      this.authStatus = 'setPassword';
    }
  }

  private allowLogIn(): void {
    this.setLogInStatus();
    this.setSessionData();
    this.authStatus = 'allow';
  }

  private forbidLogIn(): void {
    this.authStatus = 'forbid';
  }

  private setLogInStatus(): void {
    this.userData!.isLoggedIn = true;
    this.dataService.setUserData(this.userData);
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

  public login(
    email: string,
    password: string,
    hasPassword: boolean
  ): AuthStatus {
    const jsonUserData = this.checkEmail(email);
    if (jsonUserData) {
      this.userData = JSON.parse(jsonUserData);
      this.checkPassword(password, hasPassword);
      return this.authStatus;
    } else {
      this.authStatus = 'forbid';
      return this.authStatus;
    }
  }

  public setPassword(password: string): void {
    this.userData.password = password;
    this.allowLogIn();
  }

  public setLogOutStatus(): void {
    this.userData!.isLoggedIn = false;
    this.dataService.setUserData(this.userData);
  }

  public clearSessionData(): void {
    this.setStatus(false);
    this.setRole('');
    this.setEmail('');
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
}
