import {Component, Input, OnInit} from '@angular/core';
import {TennisMatch} from "../shared/models/tennis-match";

@Component({
  selector: 'app-tennis-result',
  templateUrl: './tennis-result.component.html',
  styleUrls: ['./tennis-result.component.scss']
})
export class TennisResultComponent implements OnInit {

  showAdjustPoints: boolean = true;

  @Input()
  match: TennisMatch;

  constructor() { }

  ngOnInit(): void {
  }

}
