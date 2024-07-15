  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
  import { CallApiService } from 'src/app/Services/call-api.service';

  @Component({
    selector: 'app-newaccount',
    templateUrl: './newaccount.component.html',
    styleUrls: ['./newaccount.component.css']
  })
  export class NewaccountComponent implements OnInit {

    ngOnInit() {

    }
    newAccountForm: any;
    radiobtnArray: string[] = ['Saving', 'Current'];

    constructor(private formbuilder: FormBuilder, private serviceobj: CallApiService , private router : Router) {

      this.newAccountForm = this.formbuilder.group({
        name: ['', [Validators.required]],
        accountType: ['', [Validators.required]],
        balance: ['', [Validators.required,Validators.pattern('(?=.*[0-9]).{4,16}$')]],
        adharNumber: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]]
      })
    }
    newAccountCreate() {
      let data = this.newAccountForm.value;
      console.log(data);

      this.serviceobj.newAccount(data).subscribe({
        next: (resp) => {
          alert(resp);
          this.DashboardDataByAdhar(this.newAccountForm.value.adharNumber);
        
        },
        error: (err) => {
          alert(err);
        },
        complete(){}
      })
    }

    DashboardDataByAdhar(adharNumber:any)
    {
      this.router.navigate(['dashboard' , adharNumber])
    }

    get getFromControl() {
      return this.newAccountForm.controls;
    }

  }
