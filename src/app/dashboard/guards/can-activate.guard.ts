import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';

export const canActivateAuth: CanActivateFn =
  async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuth.value) {
      return true;
    }

    await router.navigateByUrl('/sign-in');
    return false;
  };
