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
  @Output() Getoutcome!: EventEmitter<{ date_from : string; date_to :  string; }>;
  OutcomeForm! : FormGroup
  outcome! : Invoice[];
  constructor(
    public formBuilder: FormBuilder,
    private financeService: FinanceService,
    public router: Router) 
    {this.Getoutcome = new EventEmitter<{ date_from : string; date_to :  string; }>()}

  ngOnInit(): void { 
    this.OutcomeForm =  this.formBuilder.group({
      date_from: [null, [Validators.required]],
      date_to: [null, [Validators.required]],
    });
  }
  onSubmit(){
    console.log("ok")
    this.financeService.GetOutcome(this.OutcomeForm.value).subscribe((response: any) => {
      console.log(response)
  });
}
}
