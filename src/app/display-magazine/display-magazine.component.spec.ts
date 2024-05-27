import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMagazineComponent } from './display-magazine.component';

describe('DisplayMagazineComponent', () => {
  let component: DisplayMagazineComponent;
  let fixture: ComponentFixture<DisplayMagazineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayMagazineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayMagazineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
