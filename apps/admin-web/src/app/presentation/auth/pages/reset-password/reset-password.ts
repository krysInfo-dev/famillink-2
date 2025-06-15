import { Component, Directive, inject, Input, OnInit, signal } from '@angular/core';
import { AbstractControl, FormsModule, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatInput } from '@angular/material/input';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { injectResetPasswordUseCase } from '../../../../core/auth/uses-cases/reset-password.usecase';
import { ResetPasswordModel } from '../../../../core/auth/domain/models/reset-password.model';
import {
  injectVerifyResetPasswordTokenUseCase
} from '../../../../core/auth/uses-cases/verify-reset-password-token.usecase';
import { VerifyResetPasswordTokenModel } from '../../../../core/auth/domain/models/verify-reset-password-token.model';

@Directive({
  selector: '[appPasswordMatch]',
  standalone: true,
  providers: [
    { provide: NG_VALIDATORS, useExisting: PasswordMatchDirective, multi: true }
  ]
})
export class PasswordMatchDirective implements Validator {

  @Input('appPasswordMatch') passwordToMatch = '';

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value && this.passwordToMatch && control.value !== this.passwordToMatch) {
      return { passwordMismatch: true };
    }
    return null;
  }
}

@Component({
  selector: 'app-reset-password',
  imports: [
    FormsModule,
    MatError,
    MatButton,
    MatInput,
    MatError,
    MatFormField,
    MatCardContent,
    MatCard,
    PasswordMatchDirective,
  ],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.scss'],
})
export class ResetPassword implements OnInit {
  protected readonly userName = signal('');
  protected readonly resetPasswordError = signal(true);
  protected readonly password = signal('');
  protected readonly confirmPassword = signal('');

  private readonly verifyResetPasswordTokenUseCase = injectVerifyResetPasswordTokenUseCase();
  private readonly resetPasswordUseCase = injectResetPasswordUseCase();
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private token = '';
  private userId = 0;

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'] as string;
    this.userId = +this.route.snapshot.params['userId'];
    console.log('token', this.token);
    console.log('userId', this.userId);
    const verifyResetPasswordTokenModel : VerifyResetPasswordTokenModel = {
      token: this.token,
      userId: this.userId,
    };
    this.verifyResetPasswordTokenUseCase.execute(verifyResetPasswordTokenModel).subscribe({
      next: (user) => {
        if (user) {
          console.dir('user', user)
          this.userName.set(user.userName);
        } else {
          this.router.navigate(['/notfound']);
        }
      },
      error: (error) => this.onError(error),
    });
  }

  public onSubmit(): void {
    this.resetPasswordError.set(false);
    const resetPasswordModel: ResetPasswordModel = {
      token: this.token,
      userId: this.userId,
      newPassword: this.password(),
    };
    this.resetPasswordUseCase.execute(resetPasswordModel).subscribe({
      next: () => this.onSuccess(),
      error: (error) => this.onError(error),
    });
  }

  private onSuccess() {
    console.log('login success');
    this.resetPasswordError.set(true);
    this.router.navigate(['/']).then();
  }

  // @ts-expect-error error
  private onError(error) {
    console.log('login error');
    console.dir(error);
    this.resetPasswordError.set(true);
  }
}
