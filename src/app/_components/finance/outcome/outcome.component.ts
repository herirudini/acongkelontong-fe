import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/_models/Invoice';
import { AuthService } from 'src/app/_services/auth.service';
import { FinanceService } from 'src/app/_services/finance.service';

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.css']
})
export class OutcomeComponent implements OnInit {
  outcomeForm!: FormGroup
  outcome!: any
  constructor(
    public formBuilder: FormBuilder,
    private financeService: FinanceService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.outcomeForm = this.formBuilder.group({
      date_from: [null, [Validators.required]],
      date_to: [null, [Validators.required]],
    });
  }
  onSubmit() {
    console.log("ok", this.outcomeForm.value)
    this.financeService.GetOutcome(this.outcomeForm.value).subscribe((Outcome : any) => {
      this.outcome = Outcome.data
      console.log(Outcome)
    });
  }
}
