import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { AuthService } from "src/app/_services/auth.service";
import Swal from "sweetalert2";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  @Output() loginUser!: EventEmitter<{ email: string; password: string }>;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });
  constructor(private authServices: AuthService, private router: Router) {
    this.loginUser = new EventEmitter<{ email: string; password: string }>();
  }
  ngOnInit() {
    this.loginForm
  }
  onSubmit() {
    this.authServices.login(this.loginForm.value).subscribe(
      
      (response: any) => {
        localStorage.setItem("access_token", response.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("user_id", response.data._id);

        // this.authServices.loginStatusListener.next(true);
        this.router.navigate(["/" + response.data.role]);
        Swal.fire("Success", response.message, "success");

      },
      (error: any) => {
        console.log(error)
        Swal.fire("Opps...", error.error.message, "error");
      });
    
  }

}
