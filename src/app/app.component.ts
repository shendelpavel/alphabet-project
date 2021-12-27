import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isPageBlocked: boolean = false;

  blockPage(isPageBlocked: boolean) {
    this.isPageBlocked = isPageBlocked;
  }
}
