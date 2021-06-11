import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  cancelForm!: FormGroup;
  _id: any;
  cartId: any;
  data: any;

  private cartListSub = new Subscription();

  constructor(
    private cashierService: CashierService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cartListSub = this.cashierService.getListCart().subscribe((Cart) => {
      this.listCart = Cart;
    });

    this.cancelForm = this.formBuilder.group({
      notes: [null, [Validators.required]],
    });
  }

  onCancel(cartId: any) {
    console.log(this.cancelForm.value);
    this.cashierService.cancelCart(cartId, this.cancelForm.value).subscribe(
      (response: any) => {
        console.log(response);
        window.location.reload();
      },
      (err) => {
        console.log(err);
        alert('Cancel cart tidak berhasil');
      }
    );
  }

  onCheckOut() {
    this.cashierService.checkOut(this.data).subscribe(
      (response: any) => {
        console.log(response.data.items);
        console.log(response.data._id);
        window.location.reload();
      },
      (err) => {
        console.log(err);
        alert('Checkout tidak berhasil');
      }
    );
  }

  ngOnDestroy() {
    this.cartListSub.unsubscribe();
  }
}
