import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavControlComponent } from './sidenav-control.component';

describe('SidenavControlComponent', () => {
  let component: SidenavControlComponent;
  let fixture: ComponentFixture<SidenavControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SidenavControlComponent],
    });
    fixture = TestBed.createComponent(SidenavControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
