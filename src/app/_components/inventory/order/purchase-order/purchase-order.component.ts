import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/_services/inventory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {

  @Output() createPurchase!: EventEmitter<{ barcode: number; quantity: number; discount: number; }>;
  addPurchaseForm!: FormGroup;
  orderData?: any;
  suplierDetail?: any;
  constructor(public formBuilder: FormBuilder,
    public inventoryService: InventoryService,
    public router: Router) { }

  ngOnInit(): void {
    this.addPurchaseForm = this.formBuilder.group({
      barcode: [null, [Validators.required]],
      quantity: [null, [Validators.min(1)]],
      discount: []
    });
  }
  onSubmit() {
    this.inventoryService.addPurchaseOrder(this.addPurchaseForm.value).subscribe((response: any) => {
      console.log(response)
      this.orderData = response.data;
      this.getSuplierDetail()
      Swal.fire("Success", "Add Purchase Form", "success");
    });
  }
  getSuplierDetail() {
    const reqBody: object = { suplier_name: this.orderData.suplier_name }
    this.inventoryService.getSuplierByName(reqBody).subscribe((response: any) => {
      this.suplierDetail = response.data
    })
  }
}
