import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const apiURL: string = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }
  createUser(data: any) {
    console.log(data);
    console.log("cek url", apiURL);
    return this.http.post<{ logToken: string }>(`${apiURL}/owner/create-user`, data)
  }
  listuser() {
    return this.http.get<any>(`${apiURL}/owner/list-user`).pipe(
      map((res) => {
        return res.data || {};
      })
    );
  }
  GetTopProduct(data: any) {
    return this.http.get(`${apiURL}/owner/top-product`, data);
}
}

