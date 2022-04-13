import {Component, OnInit} from '@angular/core';
import {TennisMatch} from "./tennis-score/models/tennis-match.model";
import {MATCHES} from "./tennis-score/models/mock-tennis-matches";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tennis-Ticker';

  testMatch: TennisMatch;

  constructor() {
  }

  ngOnInit(): void {
    this.testMatch = this.createTestMatch();
  }

  createTestMatch(): TennisMatch {
    return MATCHES[0];
  }

}
