import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  isMenuShown: boolean = false;

  @Output() blockPage = new EventEmitter<boolean>();

  showMenu(): void {
    this.isMenuShown = !this.isMenuShown;
    this.blockPage.emit(this.isMenuShown);
    this.isMenuShown
      ? document.querySelector('body')!.classList.add('open-menu')
      : document.querySelector('body')!.classList.remove('open-menu');
  }
}
