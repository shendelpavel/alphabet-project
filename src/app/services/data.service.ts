import { Injectable } from "@angular/core";

import { User } from "./shared/user.model";

@Injectable({ providedIn: "root" })
export class DataService {
  public setUserData(userData: User): void {
    const jsonData = JSON.stringify(userData);
    if (userData.email) {
      localStorage.setItem(userData[ "email" ], jsonData);
    }
  }

  public getUserData(key: string): string {
    const userData = localStorage.getItem(key);
    if (userData) {
      return userData;
    } else {
      return "";
    }
  }
}
