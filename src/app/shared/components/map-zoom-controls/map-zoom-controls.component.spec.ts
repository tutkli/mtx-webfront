import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapZoomControlsComponent } from './map-zoom-controls.component';

describe('MapZoomControlsComponent', () => {
  let component: MapZoomControlsComponent;
  let fixture: ComponentFixture<MapZoomControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MapZoomControlsComponent],
    });
    fixture = TestBed.createComponent(MapZoomControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
