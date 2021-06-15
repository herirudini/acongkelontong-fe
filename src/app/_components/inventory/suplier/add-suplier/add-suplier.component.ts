import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { InventoryService } from 'src/app/_services/inventory.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-suplier',
  templateUrl: './add-suplier.component.html',
  styleUrls: ['./add-suplier.component.css']
})
export class AddSuplierComponent implements OnInit {
  @Output() createSuplier!: EventEmitter<{ suplier_name : string; contact: string; address: string; }>;
  addSuplierForm!: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public inventoryService: InventoryService,
    public router: Router) 
    {this.createSuplier = new EventEmitter<{ suplier_name : string; contact: string; address: string; }>()}

  ngOnInit(): void {
    this.addSuplierForm = this.formBuilder.group({
      suplier_name: [null, [Validators.required]],
      contact: [null, [Validators.required]],
      address: [null, [Validators.required]],
    });
  }
  onSubmit() {
    console.log("ok")
    this.inventoryService.addSuplier(this.addSuplierForm.value).subscribe((response: any) => {
      console.log(response)
      Swal.fire("Success", "Add suplier success..", "success");
      window.location.reload()
    });
  }

}

