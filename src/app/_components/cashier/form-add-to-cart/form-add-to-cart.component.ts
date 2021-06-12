import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CashierService } from 'src/app/_services/cashier.service';

@Component({
  selector: 'app-form-add-to-cart',
  templateUrl: './form-add-to-cart.component.html',
  styleUrls: ['./form-add-to-cart.component.css'],
})
export class FormAddToCartComponent implements OnInit, OnDestroy {
  @Output() addToCart!: EventEmitter<{ barcode: string; quantity: number }>;
  addToCartForm!: FormGroup;

  private addToCartSub = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private cashierService: CashierService
  ) {
    this.addToCart = new EventEmitter<{ barcode: string; quantity: number }>();
  }

  ngOnInit(): void {
    this.addToCartForm = this.formBuilder.group({
      barcode: [''],
      quantity: [''],
    });
  }

  onSubmit() {
    this.addToCartSub = this.cashierService
      .addToCart(this.addToCartForm.value)
      .subscribe(
        (response: any) => {
          console.log(response);
          window.location.reload();
        },
        (err) => {
          console.log(err);
          alert('Produk gagal ditmabahkan ke keranjang');
        }
      );
  }

  ngOnDestroy() {
    this.addToCartSub.unsubscribe();
  }
}
