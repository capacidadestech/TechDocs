import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);

  const router = inject(Router);

  if (auth.isLogged()) return true;

  return router.createUrlTree(['/auth/login']);
};
