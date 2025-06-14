import { Component } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatGridList, MatGridTile],
  templateUrl: './footer.html',
})
export class Footer {}
