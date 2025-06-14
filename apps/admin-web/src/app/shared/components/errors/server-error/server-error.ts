import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.html',
  styleUrls: ['./server-error.scss'],
  imports: [MatButton, RouterLink],
})
export class ServerError {}
