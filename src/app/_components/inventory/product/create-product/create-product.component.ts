import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { InventoryService } from 'src/app/_services/inventory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  addProductForm!: FormGroup;
  suplierList!: any;
  brandList!: any;
  productList!: any;
  uomList!: any;

  constructor(public formBuilder: FormBuilder, public inventoryService: InventoryService, public router: Router) { }

  subscribeListSuplier: any;

  ngOnInit(): void {
    this.subscribeListSuplier = this.inventoryService.listSuplier().subscribe((response: any) => {
      this.suplierList = response.data
      this.subscribeListSuplier.unsubscribe()
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
    this.onChanges();
  }

  subscribeValueChange: any;
  subscribeListBrand: any;
  subscribeListProductUom: any;

  onChanges(): void {
    this.subscribeValueChange = this.addProductForm.valueChanges.subscribe(value => {
      const reqBodySuplier: object = { suplier_name: value.suplier_name };
      const reqBodyBrand: object = { brand_name: value.brand_name };
      this.subscribeListBrand = this.inventoryService.listBrand(reqBodySuplier).subscribe((response: any) => {
        console.log(response)
        this.brandList = response.data.brands
        this.subscribeListBrand.unsubscribe()
      });
      this.subscribeListProductUom = this.inventoryService.listProductUom(reqBodyBrand).subscribe((response: any) => {
        console.log(response)
        this.productList = response.data.product_name
        this.uomList = response.data.uom
        this.subscribeListProductUom.unsubscribe()
      });
      this.subscribeValueChange.unsubscribe()
    })
  }

  subscribeCreateProduct: any;
  
  onSubmit() {
    console.log("checkformvalue:", this.addProductForm.value)
    this.subscribeCreateProduct = this.inventoryService.addProduct(this.addProductForm.value).subscribe((response: any) => {
      console.log(response)
      this.subscribeCreateProduct.unsubscribe()
      Swal.fire("Success", "Add Product success..", "success");
      window.location.reload()
    });
  }

}
