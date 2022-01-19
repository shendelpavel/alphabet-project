import { Injectable } from '@angular/core';
import { Parent, Student } from './shared/user.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  public setParentData(userData: Parent): void {
    const jsonData = JSON.stringify(userData);
    if (userData.email) localStorage.setItem(userData['email'], jsonData);
  }

  public setStudentData(userData: Student): void {
    const jsonData = JSON.stringify(userData);
    if (userData.email) localStorage.setItem(userData['email'], jsonData);
  }

  public getUserData(key: string): string {
    const userData = localStorage.getItem(key);
    if (userData) {
      return userData;
    } else return '';
  }
}
