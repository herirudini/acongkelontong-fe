import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/_models/Product';
import { AuthService } from 'src/app/_services/auth.service';
import { CashierService } from 'src/app/_services/cashier.service';
@Component({
  selector: 'app-product-list-cashier',
  templateUrl: './product-list-cashier.component.html',
  styleUrls: ['./product-list-cashier.component.css']
})
export class ProductListCashierComponent implements OnInit {
  title = 'Custom Search';
  searchText: any;
  Product!: Product[];
  constructor(
    private http: HttpClient,
    private cahierService: CashierService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.cahierService.getAllActiveProduct().subscribe((Product) => {
      this.Product = Product;
    });
  }
}
