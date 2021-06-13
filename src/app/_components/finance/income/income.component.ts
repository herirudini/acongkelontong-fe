import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/_models/Invoice';
import { AuthService } from 'src/app/_services/auth.service';
import { FinanceService } from 'src/app/_services/finance.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  incomeForm!: FormGroup
  income!: any
  constructor(
    public formBuilder: FormBuilder,
    private financeService: FinanceService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.incomeForm = this.formBuilder.group({
      date_from: [null, [Validators.required]],
      date_to: [null, [Validators.required]],
    });
  }
  onSubmit() {
    console.log("ok", this.incomeForm.value)
    this.financeService.GetIncome(this.incomeForm.value).subscribe((Income : any) => {
      this.income = Income.data
      console.log(Income)
    });
  }
}