import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiURL: string = environment.ApiUrl;
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient, private router: Router) { }
  addSuplier(data: any) {
    console.log('ok2');
    console.log(data);
    return this.http.post<any>(`${apiURL}/inventory/suplier`, data);
  }
  listSuplier() {
    return this.http.get<any>(`${apiURL}/inventory/suplier`);
  }
  getSuplierByName(data: any) {
    return this.http.put<any>(`${apiURL}/inventory/suplier`, data);
  }
  listBrand(data: any) {
    return this.http.put<any>(`${apiURL}/inventory/list-brand`, data);
  }
  listProductUom(data: any) {
    return this.http.put<any>(`${apiURL}/inventory/list-product-uom`, data);
  }
  addProduct(data: any) {
    return this.http.post<any>(`${apiURL}/inventory/product`, data);
  }
  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) => result.next(btoa(event.target.result.toString()));
    return result;
  }
  addPurchaseOrder(data: any) {
    return this.http.post<any>(`${apiURL}/inventory/purchase-order`, data);
  }
  addDeliveryOrder(data: any) {
    return this.http.post<any>(`${apiURL}/inventory/delivery-order`, data);
  }
  getAllProduct() {
    return this.http.get<any>(`${apiURL}/inventory/product`).pipe(
      map((res) => {
        return res.data || {};
      })
    );
  }
  listAllBrand() {
    return this.http.get(`${apiURL}/inventory/listBrand`)
  }
  getProductByBrand(data: any) {
    return this.http.put(`${apiURL}/inventory/product/byBrand`, data)
  }
  UpdateStatus(params: string, data: any): any {
    return this.http.patch(`${apiURL}/inventory/product/status/${params}`, data)
    //   .subscribe((response: any) => {
    //     if (response.success) {
    //       Swal.fire('Berhasil', 'Berhasil Edit Status', 'success')
    //       this.router.navigate(['inventory']);
    //     }
    //   })
  }
}
