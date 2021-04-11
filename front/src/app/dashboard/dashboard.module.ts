import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { AnswerComponent } from './answer/answer.component'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { QuestionsComponent } from './questions/questions.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [Geolocation],
  declarations: [DashboardPage, AnswerComponent, QuestionsComponent]
})
export class DashboardPageModule { }
