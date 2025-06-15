import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Router } from '@angular/router';
import { injectLogoutUseCase } from '../../../../core/auth/uses-cases/logout.usecase';
import { LocalStorageService } from '../../../../core/auth/services/local-storage.service';

@Component({
  selector: 'app-logout',
  imports: [
    FormsModule,
    MatButton,
    MatCardContent,
    MatCard,
  ],
  templateUrl: './logout.html',
  styleUrls: ['./logout.scss'],
})
export class Logout implements OnInit {
  readonly logoutUseCase = injectLogoutUseCase();
  readonly router = inject(Router);
  readonly localStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    this.logoutUseCase.execute().subscribe({
      next: () => this.onSuccess(),
      error: (error) => this.onError(error),
    });
  }

  public onSubmit(): void {
    this.router.navigate(['auth/login']).then();
  }

  private onSuccess() {
    console.log('logout success');
  }

  // @ts-expect-error error
  private onError(error) {
    console.log('login error');
    console.dir(error);
  }
}
