import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'questions',
    loadChildren: () => import('./questions-page/questions-page.module').then( m => m.QuestionsPagePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
