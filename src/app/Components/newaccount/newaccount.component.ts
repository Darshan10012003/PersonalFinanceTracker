import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-newaccount',
  templateUrl: './newaccount.component.html',
  styleUrls: ['./newaccount.component.css']
})
export class NewaccountComponent implements OnInit {
 radiobtnArray:any;
  ngOnInit(){

  }
  newAccountForm: FormGroup;

  constructor(private formbuilder: FormBuilder) {
    this.radiobtnArray= ['Saving', 'Current']; 
    this.newAccountForm = this.formbuilder.group({
      name:['',[Validators.required]],
      accountType :['',[Validators.required]]
    })
  }

  newAccountCreate(){

  }

}
