import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/Services/call-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ngOnInit() {

  }

  registerForm: any;

  constructor(private fb: FormBuilder, private serviceobj: CallApiService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      emailId: ['', Validators.required],
      birthDate: ['', Validators.required]
    })
  }

  registerBtn() {
    console.log(this.registerForm.value.birthDate);

    this.serviceobj.register(this.registerForm.value).subscribe({
      next: (resp) => {
        alert(resp)
      },
      error: (err) => {
        alert(err);
      },
      complete: () => {
        this.router.navigateByUrl('/login')
      }
    })
  }




  get getFromControl() {
    return this.registerForm.controls;
  }

}
