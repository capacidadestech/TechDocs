import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

type FieldName = 'email' | 'password';

/**
 * Login (smart) — reactive form con validaciones + UI animada (split screen).
 * La autenticación real (JWT) llega en M3; aquí el submit es un stub.
 * El panel izquierdo (ripple + órbitas) es decorativo y representa el stack.
 */
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  protected readonly passwordVisible = signal(false);
  protected readonly submitted = signal(false);
  protected readonly loading = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected togglePassword(): void {
    this.passwordVisible.update((v) => !v);
  }

  protected showError(name: FieldName): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || this.submitted());
  }

  protected errorFor(name: FieldName): string {
    const control = this.form.controls[name];
    if (control.hasError('required')) return 'Este campo es obligatorio';
    if (control.hasError('email')) return 'Correo no válido';
    if (control.hasError('minlength')) return 'Mínimo 6 caracteres';
    return '';
  }

  protected forgotPassword(): void {
    // Placeholder: el flujo de recuperación llega más adelante.
    console.log('Recuperar contraseña');
  }

  protected onSubmit(): void {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Stub: la autenticación real (JWT) llega en M3. Aquí solo mostramos un loading
    // breve (estilo demo) antes de entrar al dashboard.
    this.loading.set(true);
    setTimeout(() => this.router.navigateByUrl('/dashboard'), 1800);
  }
}
