import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'alphabet-project';
  blockPage: boolean = false;
  onChanged(showMenu: boolean) {
    this.blockPage = showMenu;
  }
}
