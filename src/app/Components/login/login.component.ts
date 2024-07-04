import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/Services/call-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private serviceobj: CallApiService, private router: Router) {
    this.loginForm = this.fb.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  loginBtn() {

    this.serviceobj.login(this.loginForm.value).subscribe({
      next: (resp: any) => {
        sessionStorage.setItem("Token", resp.token)
        console.log(resp);
      },
      error: (r) => {
        console.log("e", r);
      },
      complete: () => {
        this.router.navigateByUrl('/newAccount')
      }
    })
  }

  get getFromControl() {
    return this.loginForm.controls;
  }

}
