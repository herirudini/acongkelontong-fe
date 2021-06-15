import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  inputBrandForm!: FormGroup;
  brandList?: any[];
  subscribenjing!: any;
  subscribeListBrand!: any;
  isAlert = false;
  lowProduct?: any[];
  constructor(
    public formBuilder: FormBuilder,
    private http: HttpClient,
    private inventoryService: InventoryService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.subscribeListBrand = this.inventoryService
      .listAllBrand()
      .subscribe((response: any) => {
        console.log(response);
        this.brandList = response.data;
        this.subscribeListBrand.unsubscribe();
      });
    this.inputBrandForm = this.formBuilder.group({
      brand_name: new FormControl('', [Validators.required]),
    });
    this.inventoryService.getAllProduct().subscribe((Product) => {
      this.Product = Product;
      for (let i = 0; i < Product.length; i++) {
        console.log(Product[i].stock);
        if (Product[i].stock < 10) {
          const product = []
          this.isAlert = true;
          product.push(Product[i].brand_name + "_" + Product[i].product_name + "_" + Product[i].uom)
          this.lowProduct = product
        }
      }
    });
    this.inputBrandForm.valueChanges.subscribe((value) => {
      const reqBodyBrand: object = { brand_name: value.brand_name };
      if (value.brand_name !== '') {
        this.inventoryService
          .getProductByBrand(reqBodyBrand)
          .subscribe((response: any) => {
            this.Product = response.data;
          });
      } else {
        this.inventoryService.getAllProduct().subscribe((Product) => {
          this.Product = Product;
        });
      }
      // this.subscribenjing.unsubscribe()
    });
  }
  close(product: any) {
    const index = this.lowProduct?.indexOf(product);
    if (index! > -1) {
      this.lowProduct!.splice(index!, 1)
      this.checkLowProduct()
    }
  }
  checkLowProduct() {
    if (this.lowProduct!.length < 1) {
      this.isAlert = false;
    }
  }

  activate(id: string, status: string) {
    const params = id;
    const data: object = { status: status };
    console.log('datastatus:', data);
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
    const params = id;
    const data: object = { status: status };
    console.log('datastatus:', data);
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
