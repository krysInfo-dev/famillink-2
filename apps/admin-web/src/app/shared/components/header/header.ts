import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../../../core/auth/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.html',
  styleUrl: 'header.scss',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    RouterLink,
  ],
})
export class Header {
  private readonly localStorageService = inject(LocalStorageService);

  loadedUser() {
    return this.localStorageService.getUserInfos().fullName;
  }
}
