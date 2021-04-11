import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { Tab1Page } from '../tab1/tab1.page';
import { Tab2Page } from '../tab2/tab2.page';
import { Tab3Page } from '../tab3/tab3.page';
import { MapComponent } from './map/map.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "mapa"
  },{
    path:'',
    component: DashboardPage,
    children: [
      {
        path: 'mapa',
        component: MapComponent,
      },
      {
        path: 'poruke',
        component: QuestionsComponent,
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
