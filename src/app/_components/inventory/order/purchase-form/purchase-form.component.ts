import { Component, OnInit, Output ,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/_services/inventory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.css']
})
export class PurchaseFormComponent implements OnInit {
  @Output() createPurchase!: EventEmitter<{barcode : number; quantity : number; discount : number; }>;
      addPurchaseForm! : FormGroup;

  constructor(public formBuilder: FormBuilder,
    public inventoryService: InventoryService,
    public router: Router) { }

  ngOnInit(): void {this.addPurchaseForm =  this.formBuilder.group({
    barcode : [null, [Validators.required]],
    quantity : [null, [Validators.required]],
    discount : []
    
  });
  }
onSubmit(){
  this.inventoryService.addPurchaseOrder(this.addPurchaseForm.value).subscribe((response: any) =>{
    console.log(response)
    Swal.fire("Success", "Add Purchase Form", "success");
  });
}

}
