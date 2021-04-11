import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionsPagePageRoutingModule } from './questions-page-routing.module';

import { QuestionsPagePage } from './questions-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionsPagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [QuestionsPagePage]
})
export class QuestionsPagePageModule {}
