import { HttpClient } from '@angular/common/http';
import { Injectable, SecurityContext } from '@angular/core';
import { Observable, pipe, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiURL: string = environment.ApiUrl;
// import { map } from 'rxjs/operators';
// import Swal from 'sweetalert2';
// import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) { }
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
  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) => result.next(btoa(event.target.result.toString()));
    return result;
  }
  renderBin(file: Blob): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsArrayBuffer(new Blob([file]));
    // reader.readAsBinaryString(new Blob([file]))
    reader.onload = (event: any) => result.next(btoa(event.target.result.toString('base64')));
    // reader.onload = (e: any) => result.next(btoa(e.target.result.toString()
    //     .split('')
    //     .map((bit: any) =>
    //       bit.codePointAt(0).toString(16).toUpperCase())
    //     .join('')
    // ))
    return result
  }
  // NUI2RjYyNkE2NTYzNzQyMDQxNzI3MjYxNzk0Mjc1NjY2NjY1NzI1RA==
  // W29iamVjdCBBcnJheUJ1ZmZlcl0=
  getImg(file: ArrayBuffer) {
    const convert = this.converter2(file)
    const sanitize = this.domSanitizer.sanitize(SecurityContext.RESOURCE_URL, convert)
    return sanitize
  }
  converter2(file: ArrayBuffer): SafeUrl {
    let TYPED_ARRAY = new Uint8Array(file);
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, '');
    let base64String: string = btoa(STRING_CHAR);
    const result = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + base64String)
    return result
  }
  addPurchaseOrder(data: any) {
    return this.http.post<any>(`${apiURL}/inventory/purchase-order`, data);
  }
  addDeliveryOrder(data: any) {
    return this.http.post<any>(`${apiURL}/inventory/delivery-order`, data);
  }
  getAllProduct() {
    return this.http.get<any>(`${apiURL}/inventory/product`, { responseType: 'json' });
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
