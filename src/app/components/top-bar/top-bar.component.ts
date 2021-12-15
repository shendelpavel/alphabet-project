import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  showMenu: boolean = false

  @Output() onChanged = new EventEmitter<boolean>();

  menuList(): void {
    this.showMenu = !this.showMenu;
    this.onChanged.emit(this.showMenu);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
