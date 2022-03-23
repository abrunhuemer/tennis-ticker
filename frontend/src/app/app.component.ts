import { Component } from '@angular/core';
import {TennisMatch} from "./shared/models/tennis-match";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tennis-Ticker';

  createTestMatch(): TennisMatch {
    return new TennisMatch("Bernhard", "Alex");
  }
}
