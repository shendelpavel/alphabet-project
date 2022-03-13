import { Component, OnInit } from "@angular/core";

import { AuthentificateService } from "../../services/authentificate.service";

@Component({
  selector: "ap-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: [ "./top-bar.component.scss" ]
})
export class TopBarComponent implements OnInit {
  public isMenuShown: boolean = false;
  public isLoggedIn?: boolean;

  constructor(private readonly authentificateService: AuthentificateService) {}

  public ngOnInit(): void {
    this.authentificateService.currentIsLoggedIn$.subscribe(
      isLoggedIn => (this.isLoggedIn = isLoggedIn)
    );
  }

  public showMenu(): void {
    this.isMenuShown = !this.isMenuShown;
  }

  public hideMenu(): void {
    this.isMenuShown = false;
  }

  public clickLogoutButton(): void {
    this.logOut();
    this.hideMenu();
  }

  private logOut(): void {
    this.authentificateService.logOut();
  }
}
