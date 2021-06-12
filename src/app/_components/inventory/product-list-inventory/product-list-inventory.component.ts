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
  selector: 'app-product-list-inventory',
  templateUrl: './product-list-inventory.component.html',
  styleUrls: ['./product-list-inventory.component.css'],
})
export class ProductListInventoryComponent implements OnInit {

  title = 'Custom Search';
  searchText: any;
  Product!: Product[];
  UpdateStatusSubcription!: Subscription;
  constructor(
    private http: HttpClient,
    private inventoryService: InventoryService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.inventoryService.getAllProduct().subscribe((Product) => {
      this.Product = Product;
    });
  }

  activate(id: string, status: string) {
    const params = id
    const data: object = { status: status }
    this.UpdateStatusSubcription = this.inventoryService
      .UpdateStatus(params, data) //status = "inactive"
      .subscribe((response: any) => {
        console.log(response);
        this.UpdateStatusSubcription.unsubscribe();
        this.ngOnInit();
        Swal.fire({
          icon: 'success',
          title: 'Product Activated',
          showConfirmButton: true,
          timer: 3000,
        });
      });
  }

  deactivate(id: string, status: string) {
    const params = id
    const data: object = { status: status }
    this.UpdateStatusSubcription = this.inventoryService
      .UpdateStatus(params, data) //status = "active"
      .subscribe((response: any) => {
        console.log(response);
        this.UpdateStatusSubcription.unsubscribe();
        this.ngOnInit();
        Swal.fire({
          icon: 'success',
          title: 'Product Deactivated',
          showConfirmButton: true,
          timer: 3000,
        });
      });
  }
}
