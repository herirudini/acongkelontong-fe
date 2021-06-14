
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/_models/Product';
import { AuthService } from 'src/app/_services/auth.service';
import { OwnerService } from 'src/app/_services/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
ListUser! : any;
  constructor( private http: HttpClient,
    private ownerService: OwnerService,
    public router: Router) { }

  ngOnInit(): void {
    this.ownerService.listuser().subscribe((User) => {
      this.ListUser = User;
    });
  }
}