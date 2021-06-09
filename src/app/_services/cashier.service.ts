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

  addToCart(data: any) {
    return this.http.put<any>(`${apiURL}/cashier/product`, data);
  }

  getListCart() {
    return this.http.get<any>(`${apiURL}/cashier/cart`).pipe(
      map((res) => {
        return res.data || {};
      })
    );
  }
}
