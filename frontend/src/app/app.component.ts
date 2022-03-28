import {Component, OnInit} from '@angular/core';
import {TennisMatch} from "./shared/models/tennis-match";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tennis-Ticker';

  testMatch: TennisMatch;


  ngOnInit(): void {
    this.testMatch = this.createTestMatch();
  }

  createTestMatch(): TennisMatch {
    return new TennisMatch("Bernhard", "Alex");
  }

}
