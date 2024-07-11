import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/Services/call-api.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnDestroy {

  forgetPassForm: any
  respStore: any;
  otpShowButton: boolean = false;
  verifybtn : boolean = false;
  seconds: number = 120;
  timer: any;
  isTimerStarted: boolean = false;

  constructor(private serviceobj: CallApiService, private fb: FormBuilder , private router :Router) {
    this.forgetPassForm = this.fb.group({
      emailId: ['', Validators.required],
      birthDate: ['', Validators.required],
      otp: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  ngOnDestroy(): void {
    this.stopTimer();
  }
  startTimer(): void {
    this.isTimerStarted = true;
    this.timer = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.timer);
    this.isTimerStarted = false;
    // Optionally, you can perform any action when the timer stops
  }

  forgetBtn() {
    this.serviceobj.sendEmail(this.forgetPassForm.value).subscribe({
      next: (resp) => {
        this.respStore = resp;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        alert(this.respStore);
        if (this.respStore === "Send Successfully....") {
          this.startTimer();
          this.otpShowButton = true;
          this.verifybtn=true;
        }
        else {
          alert("Email Id Or BirthDate Not Match");
        }
      }
    })
  }


  verifyresp: any;
  newpasswordbtn: boolean = false;
  verifyOtp() {
    this.serviceobj.verifyOtp(this.forgetPassForm.value.emailId, this.forgetPassForm.value.otp, this.forgetPassForm.value.birthDate).subscribe({
      next: (resp) => {
        this.verifyresp = resp;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.verifybtn=false;
        this.newpasswordbtn = true;
      }
    })
  }

  newPassword() {
    this.serviceobj.newPasswordEnter(this.forgetPassForm.value.emailId, this.forgetPassForm.value.password).subscribe({
      next: (resp) => {
        alert(resp)
        this.router.navigate(['/login'])

      }
    })
  }

  get getFromControl() {
    return this.forgetPassForm.controls;
  }
}
