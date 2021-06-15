import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CashierService } from 'src/app/_services/cashier.service';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css'],
})
export class ReceiptsComponent implements OnInit, OnDestroy {
  response!: any[];

  private listReceiptSub: Subscription = new Subscription();

  constructor(private cashierService: CashierService) {}

  ngOnInit(): void {
    this.listReceiptSub = this.cashierService
      .listReceipt()
      .subscribe((response) => {
        this.response = response;
      });
  }

  ngOnDestroy() {
    this.listReceiptSub.unsubscribe;
  }
}
