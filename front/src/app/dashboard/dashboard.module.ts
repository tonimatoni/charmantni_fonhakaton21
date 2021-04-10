import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { UserFooterComponent } from '../user-footer/user-footer.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DashboardPageRoutingModule],
  providers: [Geolocation],
  declarations: [DashboardPage, UserNavbarComponent, UserFooterComponent],
})
export class DashboardPageModule {}
