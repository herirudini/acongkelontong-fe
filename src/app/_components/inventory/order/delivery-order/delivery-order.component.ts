import { Component, OnInit, Output ,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/_services/inventory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delivery-order',
  templateUrl: './delivery-order.component.html',
  styleUrls: ['./delivery-order.component.css']
})
export class DeliveryOrderComponent implements OnInit {
  @Output() createDelivery!: EventEmitter<{barcode : number; arrivedQuantity : number; }>;
  addDeliveryOrder! : FormGroup;
  constructor(public formBuilder: FormBuilder,
    public inventoryService: InventoryService,
    public router: Router) { }

  ngOnInit(): void {this.addDeliveryOrder =  this.formBuilder.group({
    barcode : [null, [Validators.required]],
    arrivedQuantity : [null, [Validators.required]],
  });
}
onSubmit(){
  this.inventoryService.addDeliveryOrder(this.addDeliveryOrder.value).subscribe((response: any) =>{
    console.log(response)
    Swal.fire("Success", "Add Delivery Order", "success");
  });
}
}
