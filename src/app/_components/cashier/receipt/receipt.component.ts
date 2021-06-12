import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IReceipt } from 'src/app/_models/Receipt';
import { CashierService } from 'src/app/_services/cashier.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
})
export class ReceiptComponent implements OnInit, OnDestroy {
  listReceipt!: IReceipt[];

  private receiptSub: Subscription = new Subscription();
  constructor(private cashierService: CashierService) {}

  ngOnInit(): void {
    this.receiptSub = this.cashierService
      .listReceipt()
      .subscribe((IReceipt) => {
        this.listReceipt = IReceipt;
      });
  }

  ngOnDestroy(): void {
    this.receiptSub.unsubscribe;
  }
}
