import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickedImageComponent } from './picked-image.component';

describe('PickedImageComponent', () => {
  let component: PickedImageComponent;
  let fixture: ComponentFixture<PickedImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickedImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
