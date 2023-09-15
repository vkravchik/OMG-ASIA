import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, CheckboxModule, ButtonModule, RippleModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  public signInForm = new FormGroup({
    email: new FormControl('OMGternopil', [Validators.required]),
    password: new FormControl('88888888', [Validators.required])
  });

  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private authService: AuthService, private router: Router) {
  }

  signIn(): void {
    this.authService.signIn({
      userAccount: this.signInForm.get('email')?.value as string,
      userPwd: this.signInForm.get('password')?.value as string,
      LoginUrl: 'Account'
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: async () => {
        this.authService.isAuth.next(true);
        await this.router.navigateByUrl('');
      },
      error: () => this.authService.isAuth.next(false)
    })
  }

}
