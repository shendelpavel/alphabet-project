import { Component } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  public isMenuShown: boolean = false;

  public showMenu(): void {
    this.isMenuShown = !this.isMenuShown;
  }

  public hideMenu(): void {
    this.isMenuShown = false;
  }
}
