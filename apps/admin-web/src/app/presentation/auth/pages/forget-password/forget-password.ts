import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatInput } from '@angular/material/input';
import { MatCard, MatCardContent } from '@angular/material/card';
import { injectForgetPasswordUseCase } from '../../../../core/auth/uses-cases/forget-password.usecase';
import {
  ForgetPasswordInformationsModel
} from '../../../../core/auth/domain/models/forget-password-informations.model';

@Component({
  selector: 'app-forget-password',
  imports: [
    FormsModule,
    MatError,
    MatButton,
    MatInput,
    MatError,
    MatFormField,
    MatCardContent,
    MatCard,
  ],
  templateUrl: './forget-password.html',
  styleUrls: ['./forget-password.scss'],
})
export class ForgetPassword {
  public forgetPasswordError = signal(true);
  public userName = signal('');

  readonly forgetPasswordUseCase = injectForgetPasswordUseCase();

  public onSubmit(): void {
    this.forgetPasswordError.set(false);
    const userLogin: ForgetPasswordInformationsModel = {
      userName: this.userName(),
    };
    this.forgetPasswordUseCase.execute(userLogin).subscribe({
      next: () => this.onSuccess(),
      error: (error) => this.onError(error),
    });
  }

  private onSuccess() {
    console.log('forget password success');
  }

  // @ts-expect-error error
  private onError(error) {
    console.log('forget password error');
    console.dir(error);
    this.forgetPasswordError.set(true);
  }
}
