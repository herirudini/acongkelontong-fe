import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Suplier} from "src/app/_models/Suplier"
import { AuthService } from 'src/app/_services/auth.service';
import { SupplierService } from 'src/app/_services/supplier.service';

import Swal from "sweetalert2";


@Component({
  selector: 'app-suplier-details',
  templateUrl: './suplier-details.component.html',
  styleUrls: ['./suplier-details.component.css']
})
export class SuplierDetailsComponent implements OnInit {
  signUpForm!: FormGroup;
  listSupplier!: Suplier[];
  constructor(public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public supplierService: SupplierService) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      suplier_name: [null, [Validators.required, Validators.email]],
      contact: [null, [Validators.required]],
      address: [""],
    });

    this.supplierService.getSupplier().subscribe((Supplier) => {
      this.listSupplier = Supplier;
    });
  }
}

