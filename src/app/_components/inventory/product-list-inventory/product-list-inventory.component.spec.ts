import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListInventoryComponent } from './product-list-inventory.component';

describe('ProductListInventoryComponent', () => {
  let component: ProductListInventoryComponent;
  let fixture: ComponentFixture<ProductListInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
