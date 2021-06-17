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
  productImages!: any[];
  UpdateStatusSubcription!: Subscription;
  inputBrandForm!: FormGroup;
  brandList?: any[];
  subscribenjing!: any;
  subscribeListBrand?: Subscription;
  subscribeListProduct?: Subscription;
  subscribeFilterBrand?: Subscription;
  isAlert = true;
  lowProduct?: any[];

  constructor(
    public formBuilder: FormBuilder,
    private inventoryService: InventoryService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.subscribeListBrand = this.inventoryService
      .listAllBrand()
      .subscribe((response: any) => {
        console.log(response);
        this.brandList = response.data;
        this.subscribeListBrand?.unsubscribe();
      });
    this.inputBrandForm = this.formBuilder.group({
      brand_name: new FormControl('', [Validators.required]),
    });
    this.subscribeListProduct = this.inventoryService.getAllProduct().subscribe((data) => {
      this.Product = data;
      const images = [];
      const product = [];
      for (let i = 0; i < data.length; i++) {
        images.push("data:image/jpeg;base64" + data[i].image)
        this.productImages = images
        if (data[i].stock! < 10) {
          product.push(data[i].brand_name + "_" + data[i].product_name + "_" + data[i].uom)
          this.lowProduct = product
        }
      }
      this.checkLowProduct;
      this.subscribeListProduct?.unsubscribe()
    });

  }
  filterBrand() {
    const reqBodyBrand: object = { brand_name: this.inputBrandForm.get('brand_name')?.value };
    if (this.inputBrandForm.get('brand_name')?.value !== '') {
      this.subscribeFilterBrand = this.inventoryService.getProductByBrand(reqBodyBrand).subscribe((response: any) => {
        this.Product = response.data;
        this.subscribeFilterBrand?.unsubscribe
      });
    } else {
      this.subscribeFilterBrand = this.inventoryService.getAllProduct().subscribe((Product) => {
        this.Product = Product;
        this.subscribeFilterBrand?.unsubscribe
      });
    }
  }
  closeNotification(product: any) {
    const index = this.lowProduct?.indexOf(product);
    if (index! > -1) {
      this.lowProduct!.splice(index!, 1)
      this.checkLowProduct()
    }
  }
  checkLowProduct() {
    if (this.lowProduct!.length < 1) {
      this.isAlert = false;
    } else {
      this.isAlert = true;
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
