import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/_models/Invoice';
import { AuthService } from 'src/app/_services/auth.service';
import { OwnerService } from 'src/app/_services/owner.service';

@Component({
  selector: 'app-top-ten',
  templateUrl: './top-ten.component.html',
  styleUrls: ['./top-ten.component.css']
})
export class TopTenComponent implements OnInit {
  topTenForm!: FormGroup
  topTen!: any[]
  constructor(
    public formBuilder: FormBuilder,
    private ownerService: OwnerService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.topTenForm = this.formBuilder.group({
      date_from: [null, [Validators.required]],
      date_to: [null, [Validators.required]],
    });
  }
  onSubmit() {
    console.log("ok", this.topTenForm.value)
    this.ownerService.GetTopProduct(this.topTenForm.value).subscribe((Topten : any) => {
      this.topTen = Topten.data
      console.log(Topten)
    });
  }
}