import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.sass']
})
export class TopBarComponent implements OnInit {
  showMenu: boolean = false

  menuList(): void {
    this.showMenu = !this.showMenu;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
