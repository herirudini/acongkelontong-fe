import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/_models/Invoice';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { FinanceService } from 'src/app/_services/finance.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  upInvoice!: EventEmitter<{
    id: string;
    status: string;
  }>;
  title = 'Custom Search';
  searchText: any;
  invoice! : Invoice[];
  UpdateInvoiceSubcription!: Subscription;
  constructor(private http: HttpClient,
    private financeService: FinanceService,
    public router: Router) {this.upInvoice = new EventEmitter<{
      id: string;
      status: string;
    }>(); }

  ngOnInit(): void {
    this.financeService.getInvoice().subscribe((Invoice) => {
      this.invoice = Invoice;
    });
  }
  UpdateInvoice(Product: { id: string; status: string }) {
    this.UpdateInvoiceSubcription = this.financeService
      .UpdateInvoice(Product.id, Product.status)
      .subscribe((response: any) => {
        console.log(response);
        this.UpdateInvoiceSubcription.unsubscribe();
        this.ngOnInit();
        Swal.fire({
          icon: 'success',
          title: 'Edit Unit of Measure Status Success',
          showConfirmButton: true,
          timer: 3000,
        });
      });
  }
  activate(id: string) {
    this.upInvoice.emit({ id: id, status: 'paid' });
  }

  deactivate(id: string) {
    this.upInvoice.emit({ id: id, status: 'unpaid' });
  }
}

