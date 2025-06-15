import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {}
