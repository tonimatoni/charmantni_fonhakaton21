import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { MapComponent } from './map/map.component';
import { QuestionsComponent } from './questions/questions.component';
import { AdvicesComponent } from '../advices/advices.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mapa',
  },
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'mapa',
        component: MapComponent,
      },
      {
        path: 'poruke',
        component: QuestionsComponent,
      },
      {
        path: 'predlozi',
        component: AdvicesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
