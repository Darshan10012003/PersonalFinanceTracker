  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
  import { CallApiService } from 'src/app/Services/call-api.service';

  @Component({
    selector: 'app-newaccount',
    templateUrl: './newaccount.component.html',
    styleUrls: ['./newaccount.component.css']
  })
  export class NewaccountComponent implements OnInit {

    ngOnInit() {

    }
    newAccountForm: FormGroup;
    radiobtnArray: string[] = ['Saving', 'Current'];

    constructor(private formbuilder: FormBuilder, private serviceobj: CallApiService) {

      this.newAccountForm = this.formbuilder.group({
        name: ['', [Validators.required]],
        accountType: ['', [Validators.required]],
        balance: ['', [Validators.required,Validators.pattern('(?=.*[0-9]).{4,16}$')]]
      })
    }
    newAccountCreate() {
      let data = this.newAccountForm.value;
      console.log(data);

      this.serviceobj.newAccount(data).subscribe({
        next: (resp) => {
          alert(resp);
        },
        error: (err) => {
          alert(err);
        },
        complete(){

        }

      })
    }

    get getFromControl() {
      return this.newAccountForm.controls;
    }

  }
