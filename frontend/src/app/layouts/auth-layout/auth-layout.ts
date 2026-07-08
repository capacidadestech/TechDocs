import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** Shell de autenticación: pantalla completa, sin sidebar. Hospeda las páginas de `features/auth`. */
@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {}
