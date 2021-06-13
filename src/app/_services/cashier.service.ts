import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const apiURL: string = environment.ApiUrl;

@Injectable({
  providedIn: 'root',
})
export class CashierService {
  constructor(private http: HttpClient) {}
  getAllActiveProduct() {
    return this.http.get<any>(`${apiURL}/cashier/product`).pipe(
      map((res) => {
        return res.data || {};
      })
    );
  }
  addToCart(data: any) {
    return this.http.post<any>(`${apiURL}/cashier/product`, data);
  }

  getListCart() {
    return this.http.get<any>(`${apiURL}/cashier/cart`).pipe(
      map((res) => {
        return res.data || {};
      })
    );
  }

  cancelCart(cartId: any, notes: any) {
    console.log('masuk service cancelcart');
    return this.http.put<any>(`${apiURL}/cashier/cart/${cartId}`, notes);
  }

  checkOut(data: any) {
    console.log('masuk service checkout');
    return this.http.post<any>(`${apiURL}/cashier/checkout`, data);
  }

  listReceipt() {
    console.log('masuk service receipt');
    return this.http.get<any>(`${apiURL}/cashier/receipt`).pipe(
      map((res) => {
        return res.data || {};
      })
    );
  }
}
