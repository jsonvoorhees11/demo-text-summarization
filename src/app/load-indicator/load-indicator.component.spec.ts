import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadIndicatorComponent } from './load-indicator.component';

describe('LoadIndicatorComponent', () => {
  let component: LoadIndicatorComponent;
  let fixture: ComponentFixture<LoadIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
