import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/_models/Product';
import { AuthService } from 'src/app/_services/auth.service';
import { InventoryService } from 'src/app/_services/inventory.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  upStatus!: EventEmitter<{
    id: string;
    status: string;
  }>;
  title = 'Custom Search';
  searchText: any;
  Product!: Product[];
  UpdateStatusSubcription!: Subscription;
  constructor(
    private http: HttpClient,
    private inventoryService: InventoryService,
    public router: Router
  ) {
    this.upStatus = new EventEmitter<{
      id: string;
      status: string;
    }>();
  }

  ngOnInit(): void {
    this.inventoryService.getAllProduct().subscribe((Product) => {
      this.Product = Product;
    });
  }
  UpdateStatus(Product: { id: string; status: string }) {
    this.UpdateStatusSubcription = this.inventoryService
      .UpdateStatus(Product.id, Product.status)
      .subscribe((response: any) => {
        console.log(response);
        this.UpdateStatusSubcription.unsubscribe();
        this.ngOnInit();
        Swal.fire({
          icon: 'success',
          title: 'Edit Unit of Measure Status Success',
          showConfirmButton: true,
          timer: 3000,
        });
      });
  }
  activate(id: string) {
    this.upStatus.emit({ id: id, status: 'active' });
  }

  deactivate(id: string) {
    this.upStatus.emit({ id: id, status: 'inactive' });
  }
}
