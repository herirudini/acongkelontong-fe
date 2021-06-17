import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { InventoryService } from 'src/app/_services/inventory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  uploadForm!: FormGroup;
  addProductForm!: FormGroup;
  suplierList?: any;
  brandList!: any;
  productList!: any;
  uomList!: any;
  imageEncoding!: any;
  previewImage: any;
  subscribeListSuplier?: Subscription;
  subscribeValueChange?: Subscription;
  subscribeListBrand?: Subscription;
  subscribeListProductUom?: Subscription;
  subscribeCreateProduct?: Subscription;

  constructor(public formBuilder: FormBuilder, public inventoryService: InventoryService, public router: Router) { }


  ngOnInit(): void {
    this.subscribeListSuplier = this.inventoryService.listSuplier().subscribe((response: any) => {
      this.suplierList = response.data
      this.subscribeListSuplier?.unsubscribe()
    })
    this.uploadForm = this.formBuilder.group({
      chooseImage: [null, [Validators.required]]
    })
    this.addProductForm = this.formBuilder.group({
      suplier_name: [null, [Validators.required]],
      brand_name: [null, [Validators.required]],
      product_name: [null, [Validators.required]],
      image: [null, [Validators.required]],
      uom: [null, [Validators.required]],
      buyPrice: [null, [Validators.min(1)]],
      sellPrice: [null, [Validators.min(1)]],
      isAfterTax: [null, [Validators.required]],
      barcode: [null, [Validators.required]],
    });
  }



  onlistSuplier() {
    const reqBodySuplier: object = { suplier_name: this.addProductForm.get('suplier_name')?.value };
    this.subscribeListBrand = this.inventoryService.listBrand(reqBodySuplier).subscribe((response: any) => {
      console.log(response)
      this.brandList = response.data.brands
      this.subscribeListBrand?.unsubscribe()
    });
  }
  onlistBrand() {
    const reqBodyBrand: object = { brand_name: this.addProductForm.get('brand_name')?.value };
    this.subscribeListProductUom = this.inventoryService.listProductUom(reqBodyBrand).subscribe((response: any) => {
      console.log(response)
      this.productList = response.data.product_name
      this.uomList = response.data.uom
      this.subscribeListProductUom?.unsubscribe()
    });
  }
  onFileSelected(event: any) {
    this.inventoryService.convertFile(event.target.files[0]).subscribe((result: any) => {
      this.addProductForm.controls['image'].setValue(result)
    })
  }
  onSubmit() {
    console.log(this.addProductForm.value)
    this.subscribeCreateProduct = this.inventoryService.addProduct(this.addProductForm.value).subscribe((response: any) => {
      console.log(response)
      this.subscribeCreateProduct?.unsubscribe()
      Swal.fire("Success", "Add Product success..", "success");
      window.location.reload()
    });
  }
}
