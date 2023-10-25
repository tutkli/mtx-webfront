import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdictionListComponent } from './jurisdiction-list.component';

describe('JurisdictionListComponent', () => {
  let component: JurisdictionListComponent;
  let fixture: ComponentFixture<JurisdictionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JurisdictionListComponent],
    });
    fixture = TestBed.createComponent(JurisdictionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
