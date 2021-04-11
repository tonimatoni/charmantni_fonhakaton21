import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  constructor(
    private fsAuth: AngularFireAuth,
    private geolocation: Geolocation
  ) {}

  ngOnInit() {}

  logout() {
    this.fsAuth.signOut();
  }
}
