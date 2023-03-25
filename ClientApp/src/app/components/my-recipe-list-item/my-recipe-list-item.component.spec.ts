import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecipeListItemComponent } from './my-recipe-list-item.component';

describe('MyRecipeListItemComponent', () => {
  let component: MyRecipeListItemComponent;
  let fixture: ComponentFixture<MyRecipeListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRecipeListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRecipeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
