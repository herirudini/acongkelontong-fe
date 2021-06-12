import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/_models/Product';
import { AuthService } from 'src/app/_services/auth.service';
import { InventoryService } from 'src/app/_services/inventory.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  title = 'Custom Search';
  searchText: any;
  Product!: Product[];
  constructor(
    private http: HttpClient,
    private inventoryService: InventoryService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.inventoryService.getProduct().subscribe((Product) => {
      this.Product = Product;
    });
  }
}
