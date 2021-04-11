import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss'],
})
export class UserNavbarComponent implements OnInit {
  constructor(private menu: MenuController) {}

  toggleMenu() {
    this.menu.toggle('end');
  }

  ngOnInit() {}
}
