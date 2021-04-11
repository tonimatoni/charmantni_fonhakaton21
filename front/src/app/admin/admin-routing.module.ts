import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmergencyComponent } from './add-emergency/add-emergency.component';

import { AdminPage } from './admin.page';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mapa',
  },
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: 'mapa',
        component: MapComponent,
      },
      {
        path: 'vanredne-situacije',
        component: AddEmergencyComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'questions',
        loadChildren: () =>
          import('./questions-page/questions-page.module').then(
            (m) => m.QuestionsPagePageModule
          ),
      },
      {
        path: 'vanredne-situacije',
        component: AddEmergencyComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
