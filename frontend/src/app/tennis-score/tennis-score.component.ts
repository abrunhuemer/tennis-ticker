import {Component, Input, OnInit} from '@angular/core';
import {TennisMatch} from "./models/tennis-match.model";
import {TennisScoreService} from "./services/tennis-score.service";

@Component({
  selector: 'tt-tennis-score',
  templateUrl: './tennis-score.component.html',
  styleUrls: ['./tennis-score.component.scss']
})
export class TennisScoreComponent implements OnInit {

  @Input()
  showPointControls: boolean = true;

  @Input()
  match: TennisMatch;

  constructor(private scoreService: TennisScoreService) { }

  ngOnInit(): void {
  }

  addPointPlayer1(): void {
    this.scoreService.addPointForPlayer1(this.match);
  }

  addPointPlayer2(): void {
    this.scoreService.addPointForPlayer2(this.match);
  }

}
