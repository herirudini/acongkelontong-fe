import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwnerService } from 'src/app/_services/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  url: any
  createUserForm!: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public ownerService: OwnerService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.url = location.origin + "/login/reset-password";
    this.createUserForm = this.formBuilder.group({
      new_username: [null, [Validators.required]],
      new_email: [null, [Validators.required]],
      role: [null, [Validators.required]],
      originUrl: this.url
    });
  }
  onSubmit() {

    this.ownerService.createUser(this.createUserForm.value).subscribe((response: any) => {
      console.log(response)
      if (response.success) {
        Swal.fire("Success", response.message, response.data);
      }
    });
  }
}
