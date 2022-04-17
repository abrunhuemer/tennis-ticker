import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TennisScoreComponent} from './tennis-score.component';
import {MATCHES} from "./models/mock-tennis-matches";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";

describe('TennisScoreComponent', () => {
  let component: TennisScoreComponent;
  let fixture: ComponentFixture<TennisScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TennisScoreComponent],
      imports: [MatIconModule, MatDividerModule, MatCardModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TennisScoreComponent);
    component = fixture.componentInstance;
    component.match = MATCHES[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
