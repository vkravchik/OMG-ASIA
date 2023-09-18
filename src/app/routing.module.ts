import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { canActivateAuth } from './dashboard/guards/can-activate.guard';
import { ProductReleaseComponent } from './product-release/product-release.component';
import { SignInComponent } from './sign-in/sign-in.component';

// sets up routes constant where you define your routes
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [canActivateAuth]},
  { path: 'product-release', component: ProductReleaseComponent, canActivate: [canActivateAuth]},
  { path: 'sign-in', component: SignInComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
