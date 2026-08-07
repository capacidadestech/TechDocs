import { Injectable, Service } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged(): boolean {
    return localStorage.getItem('logged') === 'true';
  }

  login() {
    localStorage.setItem('logged', 'true');
  }

  logout() {
    localStorage.removeItem('logged');
  }
}
