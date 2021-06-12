import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/Product';
import { CashierService } from 'src/app/_services/cashier.service';

@Component({
  selector: 'app-product-list-cashier',
  templateUrl: './product-list-cashier.component.html',
  styleUrls: ['./product-list-cashier.component.css'],
})
export class ProductListCashierComponent implements OnInit {
  title = 'Custom Search';
  searchText: any;
  Product!: Product[];
  constructor(private cahierService: CashierService) {}

  ngOnInit(): void {
    this.cahierService.getAllActiveProduct().subscribe((Product) => {
      this.Product = Product;
    });
  }
}
