import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TennisScoreComponent } from './tennis-score.component';

describe('TennisScoreComponent', () => {
  let component: TennisScoreComponent;
  let fixture: ComponentFixture<TennisScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TennisScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TennisScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
