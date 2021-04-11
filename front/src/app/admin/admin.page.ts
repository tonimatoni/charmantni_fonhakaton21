import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  
  constructor(private fsAuth:AngularFireAuth) {

  }

  ngOnInit() {
  }

  logout(){
    this.fsAuth.signOut();
  }

}
