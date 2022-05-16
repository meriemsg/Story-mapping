import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AssignneComponent} from './assignne.component';

describe('AssignneComponent', () => {
  let component: AssignneComponent;
  let fixture: ComponentFixture<AssignneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignneComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
