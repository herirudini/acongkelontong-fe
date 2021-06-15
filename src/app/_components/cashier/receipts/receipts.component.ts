import { Component, OnInit } from '@angular/core';
import { CashierService } from 'src/app/_services/cashier.service';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css'],
})
export class ReceiptsComponent implements OnInit {
  response!: any[];

  constructor(private cashierService: CashierService) {}

  ngOnInit(): void {
    this.cashierService.listReceipt().subscribe((response) => {
      this.response = response;
    });
  }
}
