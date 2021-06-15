import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/_models/Invoice';
import { AuthService } from 'src/app/_services/auth.service';
import { FinanceService } from 'src/app/_services/finance.service';
import { OwnerService } from 'src/app/_services/owner.service';
@Component({
  selector: 'app-cashflow',
  templateUrl: './cashflow.component.html',
  styleUrls: ['./cashflow.component.css']
})
export class CashflowComponent implements OnInit {
  cashFlowRange!: FormGroup
  income?: any[];
  outcome?: any[];
  totalIncome?: number;
  totalOutcome?: number;
  totalFlow?: number;
  result?: string;
  constructor(
    public formBuilder: FormBuilder,
    private ownerServices: OwnerService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.cashFlowRange = this.formBuilder.group({
      date_from: [null, [Validators.required]],
      date_to: [null, [Validators.required]],
    });
  }
  onSubmit() {
    console.log("ok", this.cashFlowRange.value)
    this.ownerServices.cashFlow(this.cashFlowRange.value).subscribe((response: any) => {
      const dataOutcome = response.data.outcome
      const dataIncome = response.data.income
      // this.onHitung()
      // this.ngOnInit()
      this.income = dataIncome;
      this.outcome = dataOutcome
      console.log(response)
      let hitungOutcome = 0;
      let hitungIncome = 0;
      for (let i = 0; i < dataOutcome.length; i++) {
        hitungOutcome += dataOutcome[i].bill
      }
      for (let i = 0; i < dataIncome.length; i++) {
        hitungIncome += dataIncome[i].totalPrice
      }
      this.totalIncome = hitungIncome;
      this.totalOutcome = hitungOutcome;
      this.totalFlow = this.totalIncome - this.totalOutcome
      if (this.totalFlow < 0) {
        this.result = "loss"
      } else {
        this.result = "profit"
      }
    });
  }
  onHitung() {

  }

}
