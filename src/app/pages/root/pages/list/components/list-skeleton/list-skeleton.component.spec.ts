import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSkeletonComponent } from './list-skeleton.component';

describe('ListSkeletonComponent', () => {
  let component: ListSkeletonComponent;
  let fixture: ComponentFixture<ListSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListSkeletonComponent],
    });
    fixture = TestBed.createComponent(ListSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
