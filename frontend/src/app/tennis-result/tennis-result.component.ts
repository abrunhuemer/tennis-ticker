import {Component, Input, OnInit} from '@angular/core';
import {TennisMatch} from "../shared/models/tennis-match";

@Component({
  selector: 'tt-tennis-result',
  templateUrl: './tennis-result.component.html',
  styleUrls: ['./tennis-result.component.scss']
})
export class TennisResultComponent implements OnInit {

  @Input()
  showPointControls: boolean = true;

  @Input()
  match: TennisMatch;

  constructor() { }

  ngOnInit(): void {
  }

}
