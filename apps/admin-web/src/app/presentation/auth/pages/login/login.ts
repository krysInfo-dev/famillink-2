import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatInput } from '@angular/material/input';
import { MatCard, MatCardContent } from '@angular/material/card';
import { injectLoginUseCase } from '../../../../core/auth/uses-cases/login.usecase';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoginInformationsModel } from '../../../../core/auth/domain/models/login-informations.model';
import { LoginResultModel } from '../../../../core/auth/domain/models/login-result.model';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatError,
    MatButton,
    MatInput,
    MatError,
    MatFormField,
    MatCardContent,
    MatCard,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  public loginError = signal(true);
  public email = signal('');
  public password = signal('');

  private readonly returnUrl: string[];

  readonly loginUseCase = injectLoginUseCase();
  readonly router = inject(Router);
  readonly _route = inject(ActivatedRoute);

  constructor() {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || ['/'];
  }

  public onSubmit(): void {
    this.loginError.set(false);
    console.log('login with ', this.email(), ' and ', this.password());
    const userLogin: LoginInformationsModel = {
      email: this.email(),
      password: this.password(),
    };
    this.loginUseCase.execute(userLogin).subscribe({
      next: (infos: LoginResultModel | undefined) => this.onSuccess(infos),
      error: (error) => this.onError(error),
    });
  }

  private onSuccess(infos: LoginResultModel | undefined) {
    console.log('login success');
    console.dir(infos);
    this.router.navigate(this.returnUrl).then();
  }

  // @ts-expect-error error
  private onError(error) {
    console.log('login error');
    console.dir(error);
    this.loginError.set(true);
  }
}
