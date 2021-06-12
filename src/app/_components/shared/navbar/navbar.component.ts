import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role!: string | null;
  rolelist!: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.role = this.authService.getUserRole()
    this.appendList()
  }
  appendList() {
    if (this.role === "owner") {
      this.rolelist = ["owner", "inventory", "finance", "cashier"]
    }

  }

  logout() {
    this.authService.logout();
  }
}
