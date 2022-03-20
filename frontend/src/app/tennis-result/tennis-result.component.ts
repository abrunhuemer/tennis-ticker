import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tennis-result',
  templateUrl: './tennis-result.component.html',
  styleUrls: ['./tennis-result.component.scss']
})
export class TennisResultComponent implements OnInit {

  showAdjustPoints: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
