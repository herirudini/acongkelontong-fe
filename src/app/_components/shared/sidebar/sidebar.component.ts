import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuData?: any[];
  title?: any;
  constructor(private authServices: AuthService, private route: Router) { }

  ngOnInit(): void {
    let router: any = this.route.url;
    router = router.split('/');
    // console.log(router[1])
    const owner = ["cashflow", "top-10", "employee"];
    const inventory = ["product", "order", "suplier"];
    const finance = ["invoices", "income", "outcome"]
    const cashier = ["cart", "receipts"]
    const role: string | null = this.authServices.getUserRole()
    if (router[1] == "inventory") {
      this.menuData = inventory;
      this.title = "INVENTORY"
    } else if (router[1] == "finance") {
      this.menuData = finance;
      this.title = "FINANCE"
    } else if (router[1] == "cashier") {
      this.menuData = cashier;
      this.title = "CASHIER"
    } else {
      this.menuData = owner;
      this.title = "OWNER"
    }
  }

}
