import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/_services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  url: any
  forgetPasswordForm!: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public authServices: AuthService,
  ) { }

  ngOnInit(): void {
    this.url = location.origin + "/login/reset-password";
    this.forgetPasswordForm = this.formBuilder.group({
      email: [null, [Validators.email]],
      originUrl: this.url
    });
  }
  onSubmit() {
    this.authServices.forgetPassword(this.forgetPasswordForm.value).subscribe((response: any) => {
      console.log(response)
      if (response.success) {
        Swal.fire("Success", response.message, response.data);
      }
    });
  }
}
