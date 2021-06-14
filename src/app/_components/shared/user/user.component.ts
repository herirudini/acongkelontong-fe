import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username?: any;
  user_id?: any;
  constructor(private authServices: AuthService) { }

  ngOnInit(): void {
    this.username = this.authServices.getUserName();
    this.user_id = this.authServices.getUserId();
  }
}
