import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/_models/Cart';
import { CashierService } from 'src/app/_services/cashier.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  listCart!: Cart[];
  private authStatusSub = new Subscription();

  constructor(private cashierService: CashierService) {}

  ngOnInit(): void {
    this.authStatusSub = this.cashierService.getListCart().subscribe((Cart) => {
      this.listCart = Cart;
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
