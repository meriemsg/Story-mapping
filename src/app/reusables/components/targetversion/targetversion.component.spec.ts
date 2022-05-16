import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetversionComponent} from './targetversion.component';

describe('TargetversionComponent', () => {
  let component: TargetversionComponent;
  let fixture: ComponentFixture<TargetversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TargetversionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
