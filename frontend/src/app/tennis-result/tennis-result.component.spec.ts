import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TennisResultComponent } from './tennis-result.component';

describe('TennisResultComponent', () => {
  let component: TennisResultComponent;
  let fixture: ComponentFixture<TennisResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TennisResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TennisResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
