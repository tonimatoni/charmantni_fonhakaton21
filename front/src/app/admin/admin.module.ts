import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { LoginComponent } from './login/login.component';
import { AddEmergencyComponent } from './add-emergency/add-emergency.component';

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
    AddEmergencyComponent
  ]
})
export class AdminPageModule {}
