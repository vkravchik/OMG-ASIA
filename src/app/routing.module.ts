import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { canActivateDashboard } from './dashboard/guards/can-activate.guard';
import { SignInComponent } from './sign-in/sign-in.component';

// sets up routes constant where you define your routes
const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [canActivateDashboard]},
  { path: 'sign-in', component: SignInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
