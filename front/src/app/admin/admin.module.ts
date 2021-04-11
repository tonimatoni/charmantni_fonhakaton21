import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';

import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
import { AddEmergencyComponent } from './add-emergency/add-emergency.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AdminPage,
    LoginComponent,
    AddEmergencyComponent,
    AdminNavbarComponent,
    AdminFooterComponent,
    MapComponent,
  ],
  providers: [Geolocation],
})
export class AdminPageModule {}
