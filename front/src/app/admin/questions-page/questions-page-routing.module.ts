import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionsPagePage } from './questions-page.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsPagePageRoutingModule {}
