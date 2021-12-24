import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  showMenu: boolean = false;

  isLoggedIn?: boolean;

  @Output() onChanged = new EventEmitter<boolean>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.currentIsLoggedIn.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );
  }

  menuList(): void {
    this.showMenu = !this.showMenu;
    this.onChanged.emit(this.showMenu);
    this.showMenu
      ? (document.querySelector('body')!.style.overflow = 'hidden')
      : (document.querySelector('body')!.style.overflow = 'visible');
  }

  logOut() {
    const email = this.dataService.getEmail();
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
    this.dataService.setStatus(false);
    this.dataService.setRole('');
    this.dataService.setEmail('');
  }
}
