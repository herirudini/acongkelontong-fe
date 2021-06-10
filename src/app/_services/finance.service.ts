import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
const apiURL: string = environment.ApiUrl;
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  constructor(private http: HttpClient, private auth: AuthService) {}
  getInvoice() {
    return this.http.get<any>(`${apiURL}/finance/invoice`).pipe(
      map((res) => {
        console.log(res);

        return res.data || {};
      })
    );
  }
  GetOutcome(data: any) {
    return this.http.get<any>(`${apiURL}/finance/outcome`, data);
  }
}
