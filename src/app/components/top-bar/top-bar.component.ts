import { Component, OnInit } from '@angular/core';
import { AuthentificateService } from '../../services/authentificate.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  public isMenuShown: boolean = false;

  isLoggedIn?: boolean;

  constructor(private authentificateService: AuthentificateService) {}

  ngOnInit(): void {
    this.authentificateService.currentIsLoggedIn.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );
  }

  public showMenu(): void {
    this.isMenuShown = !this.isMenuShown;
  }

  public hideMenu(): void {
    this.isMenuShown = false;
  }

  logOut() {
    const email = this.authentificateService.getEmail();
    let jsonUserData = localStorage.getItem(email);
    if (jsonUserData) {
      let userData = JSON.parse(jsonUserData);
      this.setStatus(userData);
    }
  }

  setStatus(userData: any) {
    userData.isLoggedIn = false;
    this.setSessionData();
    const jsonUserData = JSON.stringify(userData);
    localStorage.setItem(userData.email, jsonUserData);
  }

  setSessionData() {
    this.authentificateService.setStatus(false);
    this.authentificateService.setRole('');
    this.authentificateService.setEmail('');
  }
}
