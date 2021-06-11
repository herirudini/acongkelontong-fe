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
  suplierList!: any;
  brandList!: any;

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
    this.addProductForm.controls['suplier_name'].valueChanges.subscribe(value => {
      console.log(value)
      this.inventoryService.listBrand(value).subscribe((response: any) => {
        this.brandList = response.data.brands
      })
    })
  }
  onSubmit() {
    this.inventoryService.addProduct(this.addProductForm.value).subscribe((response: any) => {
      console.log(response)
      Swal.fire("Success", "Add Product success..", "success");
    });
  }

}
