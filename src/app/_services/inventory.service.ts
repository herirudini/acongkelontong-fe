import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiURL: string = environment.ApiUrl;
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}
  addSuplier(data: any) {
    console.log('ok2');
    console.log(data);
    return this.http.post<any>(`${apiURL}/inventory/suplier`, data);
  }
  listSuplier(){
    return this.http.get<any>(`${apiURL}/inventory/suplier`);
  }
  listBrand(data: any){
    return this.http.put<any>(`${apiURL}/inventory/list-brand`, data);
  }
  listProductUom(data: any){
    return this.http.put<any>(`${apiURL}/inventory/list-product-uom`, data);
  }
  addProduct(data: any) {
    return this.http.post<any>(`${apiURL}/inventory/product`, data);
  }
  addPurchaseOrder(data: any) {
    return this.http.post<any>(`${apiURL}/inventory/purchase-order`, data);
  }
  addDeliveryOrder(data: any) {
    return this.http.post<any>(`${apiURL}/inventory/delivery-order`, data);
  }

  getProduct() {
    return this.http.get<any>(`${apiURL}/inventory/product`).pipe(
      map((res) => {
        return res.data || {};
      })
    );
  }
}
