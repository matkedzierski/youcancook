import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavBadgeComponent } from './fav-badge.component';

describe('FavBadgeComponent', () => {
  let component: FavBadgeComponent;
  let fixture: ComponentFixture<FavBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
