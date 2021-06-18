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
  products!: Product[];
  productImages!: any[];
  UpdateStatusSubcription!: Subscription;
  inputBrandForm!: FormGroup;
  brandList?: any[];
  subscribenjing!: any;
  subscribeListBrand?: Subscription;
  subscribeListProduct?: Subscription;
  subscribeFilterBrand?: Subscription;
  isAlert = false;
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
    this.subscribeListProduct = this.inventoryService.getAllProduct().subscribe((response: any) => {
      this.products = response.data;
      const data = response.data
      const products = [];
      for (let i = 0; i < data.length; i++) {
        // this.products[i].image = "data:image/jpeg;base64," + data[i].image.data
        // this.inventoryService.renderBin(data[i].image.data).subscribe((result: any) => {
        //   // this.products[i].image = "data:image/jpeg;base64," + result
        // })
        this.products[i].image = this.inventoryService.getImg(data[i].image.data)
        if (data[i].stock! < 10) {
          products.push(data[i].brand_name + "_" + data[i].product_name + "_" + data[i].uom)
        }
      }
      console.log(this.products)
      this.subscribeListProduct?.unsubscribe()
      // this.productImages = images
      this.lowProduct = products
      if (this.lowProduct?.length > 0) { this.isAlert = true }
      // console.log(this.products[0].image, this.productImages, this.lowProduct)
    });

  }
  filterBrand() {
    const reqBodyBrand: object = { brand_name: this.inputBrandForm.get('brand_name')?.value };
    if (this.inputBrandForm.get('brand_name')?.value !== '') {
      this.subscribeFilterBrand = this.inventoryService.getProductByBrand(reqBodyBrand).subscribe((response: any) => {
        this.products = response.data;
        this.subscribeFilterBrand?.unsubscribe
      });
    } else {
      this.subscribeFilterBrand = this.inventoryService.getAllProduct().subscribe((response: any) => {
        this.products = response.data;
        this.subscribeFilterBrand?.unsubscribe
      });
    }
  }
  closeNotification(item: any) {
    const index = this.lowProduct?.indexOf(item);
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
