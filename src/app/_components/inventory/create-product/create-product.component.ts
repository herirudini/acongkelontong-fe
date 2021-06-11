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
  @Output() createProduct!: EventEmitter<{
    status: string; supplier_name: string; brand_name: string;
    product_name: string; image: string; uom: string; stock: number;
    buyPrice: number; sellPrice: number; isAfterTax: string; barcode: string;
  }>;
  valueSuplier!: any;
  suplierList!: any;
  brandList!: any;
  productList!: any;
  uomList!: any;

  addProductForm!: FormGroup;
  constructor(public formBuilder: FormBuilder,
    public inventoryService: InventoryService,
    public router: Router) {
    this.createProduct = new EventEmitter<{
      status: string; supplier_name: string; brand_name: string;
      product_name: string; image: string; uom: string; stock: number;
      buyPrice: number; sellPrice: number; isAfterTax: string; barcode: string;
    }>()
  }

  ngOnInit(): void {
    this.inventoryService.listSuplier().subscribe((response: any) => {
      this.suplierList = response.data
    })
    this.addProductForm = this.formBuilder.group({
      suplier_name: [null, [Validators.required]],
      brand_name: [null, [Validators.required]],
      product_name: [null, [Validators.required]],
      image: [null, [Validators.required]],
      uom: [null, [Validators.required]],
      buyPrice: [null, [Validators.required]],
      sellPrice: [null, [Validators.required]],
      isAfterTax: [null, [Validators.required]],
      barcode: [null, [Validators.required]],
    });
    this.onChanges();
  }
  onChanges(): void{
    this.addProductForm.valueChanges.subscribe(value => {
      const reqBodySuplier: object = { suplier_name: value.suplier_name };
      const reqBodyBrand: object = { brand_name: value.brand_name };
      this.inventoryService.listBrand(reqBodySuplier).subscribe((response: any) => {
        console.log(response)
        this.brandList = response.data.brands
      });
      this.inventoryService.listProductUom(reqBodyBrand).subscribe((response: any) => {
        console.log(response)
        this.productList = response.data.product_name
        this.uomList = response.data.uom
      });
    })
  }
  onSubmit() {
    this.inventoryService.addProduct(this.addProductForm.value).subscribe((response: any) => {
      console.log(response)
      Swal.fire("Success", "Add Product success..", "success");
    });
  }

}
