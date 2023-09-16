import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { canActivateAuth } from './dashboard/guards/can-activate.guard';
import { ProductReleaseComponent } from './product-release/product-release.component';
import { SignInComponent } from './sign-in/sign-in.component';

// sets up routes constant where you define your routes
const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [canActivateAuth]},
  { path: 'product-release', component: ProductReleaseComponent, canActivate: [canActivateAuth]},
  { path: 'sign-in', component: SignInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
