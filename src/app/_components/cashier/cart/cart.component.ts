import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/_models/Cart';
import { CashierService } from 'src/app/_services/cashier.service';
import { Receipt } from 'src/app/_models/Receipt';
import { Product } from 'src/app/_models/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  title = 'Custom Search';
  searchText: any;
  Product!: Product[];
  listCart!: Cart[];
  addToCartForm!: FormGroup;
  cancelForm!: FormGroup;
  countTax?: number;
  countTotalPrice?: number;
  date: any;
  receiptData?: Receipt;

  constructor(
    private cashierService: CashierService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.date = new Date();
    this.initListCart();
    this.initListProduct();
    this.addToCartForm = this.formBuilder.group({
      barcode: [''],
      quantity: [''],
    });
    this.cancelForm = this.formBuilder.group({
      notes: [null, [Validators.required]],
    });
  }
  initListProduct() {
    this.cashierService.getAllActiveProduct().subscribe((response: any) => {
      console.log('masuk subscribe all product', response);
      this.Product = response;
    });
  }
  initListCart() {
    let hitungPajak = 0;
    let hitungTotalHarga = 0;
    this.cashierService.getListCart().subscribe((response: any) => {
      console.log('masuk subscribe list cart', response);
      this.listCart = response;
      for (let i = 0; i < response.length; i++) {
        hitungPajak += response[i].tax;
        hitungTotalHarga += response[i].totalPrice;
      }
      this.countTax = hitungPajak;
      this.countTotalPrice = hitungTotalHarga;
      console.log('masuk hitungan');
    });
  }

  onSubmit() {
    this.cashierService.addToCart(this.addToCartForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.initListCart();
        this.ngOnInit();
        // window.location.reload();
      },
      (err) => {
        console.log(err);
        alert('Produk gagal ditmabahkan ke keranjang');
      }
    );
  }
  onCancel(cartId: any) {
    console.log(this.cancelForm.value);
    this.cashierService.cancelCart(cartId, this.cancelForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.initListCart();
        this.ngOnInit();
        // window.location.reload();
      },
      (err) => {
        console.log(err);
        alert('Cancel cart tidak berhasil');
      }
    );
  }

  onCheckOut() {
    this.cashierService.checkOut('admin').subscribe(
      (response: any) => {
        this.receiptData = response.data;
        console.log(response.data.items);
        this.ngOnInit();
        // window.location.reload();
      },
      (err) => {
        console.log(err);
        alert('Checkout tidak berhasil');
      }
    );
  }

  // ngOnDestroy() {
  //   this.cartListSub.unsubscribe();
  //   this.addToCartSub.unsubscribe();
  // }
}

//tombol cancel ada di dalam list cart
//perkiraan total price dan total tax lakukan disini
