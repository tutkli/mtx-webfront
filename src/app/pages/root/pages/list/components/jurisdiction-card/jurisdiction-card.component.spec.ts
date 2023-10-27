import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdictionCardComponent } from './jurisdiction-card.component';

describe('JurisdictionCardComponent', () => {
  let component: JurisdictionCardComponent;
  let fixture: ComponentFixture<JurisdictionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JurisdictionCardComponent],
    });
    fixture = TestBed.createComponent(JurisdictionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
