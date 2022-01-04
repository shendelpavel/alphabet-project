import { Injectable } from '@angular/core';
import { User } from './shared/user.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  public setUserData(data: User) {
    const jsonData = JSON.stringify(data);
    if (data.email) localStorage.setItem(data['email'], jsonData);
  }

  public getUserData(key: string) {
    return localStorage.getItem(key);
  }
}
