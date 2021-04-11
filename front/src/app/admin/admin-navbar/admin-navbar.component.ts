import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss'],
})
export class AdminNavbarComponent implements OnInit {
  constructor(private menu: MenuController) {}
  // className: string = 'navmenu off';

  openMenu() {
    this.menu.open('end');
  }
  closeMenu() {
    this.menu.close('end');
  }
  toggleMenu() {
    this.menu.toggle('end');
  }

  ngOnInit() {}
}
