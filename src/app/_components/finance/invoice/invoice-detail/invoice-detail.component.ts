import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinanceService } from 'src/app/_services/finance.service';
import { Invoice } from '../../../../_models/Invoice'
@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
  getParams!: any;
  invoiceData!: Invoice;
  constructor(private route: ActivatedRoute,private financeServices: FinanceService) { }

  ngOnInit(): void {
    this.getParams = this.route.snapshot.params['invoice_id'];
    console.log("params", this.getParams)
    this.financeServices.getInvoiceDetail(this.getParams).subscribe((response: any) => {
      this.invoiceData = response.data
    })
  }
  paySuplier(invoice_id: any) {
    this.financeServices.setStatusInvoice(invoice_id).subscribe((response: any) => {
      console.log(response)
      this.ngOnInit
    })
  }
}
