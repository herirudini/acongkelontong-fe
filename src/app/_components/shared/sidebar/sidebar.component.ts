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
    const owner = [
      {
        menu: "CASHFLOW",
        link: "owner/cashflow"
      },
      {
        menu: "TOP-10",
        link: "owner/top-ten"
      },
      {
        menu: "EMPLOYEE",
        link: "owner/employee"
      }
    ];
    const inventory = [
      {
        menu: "PRODUCT",
        link: "product"
      },
      {
        menu: "ORDER",
        link: "order"
      },
      {
        menu: "SUPLIER",
        link: "suplier"
      }
    ];
    const finance = [
      {
        menu: "INVOICE",
        link: "invoice"
      },
      {
        menu: "INCOME",
        link: "income"
      },
      {
        menu: "OUTCOME",
        link: "outcome"
      }
    ]
    const cashier = [
      {
        menu: "CART",
        link: "cart"
      },
      {
        menu: "RECEIPT",
        link: "receipt"
      }
    ]
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
