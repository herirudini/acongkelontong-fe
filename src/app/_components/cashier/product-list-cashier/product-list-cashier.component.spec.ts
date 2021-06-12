import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListCashierComponent } from './product-list-cashier.component';

describe('ProductListCashierComponent', () => {
  let component: ProductListCashierComponent;
  let fixture: ComponentFixture<ProductListCashierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListCashierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListCashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
