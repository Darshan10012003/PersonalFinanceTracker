import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/Services/call-api.service';
import { TransactionHistoryService } from 'src/app/Services/transaction-history.service';


@Component({
  selector: 'app-withdraw-and-deposite-by-cash',
  templateUrl: './withdraw-and-deposite-by-cash.component.html',
  styleUrls: ['./withdraw-and-deposite-by-cash.component.css']
})
export class WithdrawAndDepositeByCashComponent {
  flag : boolean =true;
  withDepForm: any
  TransactionDataBywalletId: any;
  // 'Withdraw'
  withdrawArr: string[] = [ 'Deposit' , 'WITHDRAW'];
  constructor(private trService: TransactionHistoryService, private serviceobj: CallApiService, private fb: FormBuilder , private router : Router) {
    this.withDepForm = this.fb.group({
      item: [''],
      accontNumber: ['', Validators.required],
      // bankDeposite: ['', Validators.required,Validators.min(2001)]
      bankDeposite: ['', [Validators.required, Validators.min(2001)]]
    })
  }

    withDepButtons(){
      let payload = {
        bankDeposite: this.withDepForm.value.bankDeposite
        
      }
      this.serviceobj.withDepMoney(this.withDepForm.value.accontNumber, payload).subscribe({
        next: (resp) => { 
          console.log(resp);
          alert(resp)
          console.error(payload)
          this.GetTransactionHistoryby_BankAccNo(this.withDepForm.value.accontNumber)
        },
        error:(err)=>
        {
          console.log("ERROR FROM WITHDRAW COMPONENTS ---> " +payload)
        }
      })
    }

WithDrawMoneyBycashUsing_AccNo()
{
  let payload = {
    bankDeposite: this.withDepForm.value.bankDeposite
    
  }
  this.serviceobj.WithDrawMoneyBycashUsing_AccNo(this.withDepForm.value.accontNumber, payload).subscribe({
    next: (resp) => { 
      console.log(resp);
      alert(resp)
      console.error(payload)
      this.GetTransactionHistoryby_BankAccNo(this.withDepForm.value.accontNumber)
    },
    error:(err)=>
    {
      console.log("ERROR FROM WITHDRAW COMPONENTS ---> " +payload)
    }
  })
}


    GetTransactionHistoryby_BankAccNo(bankNo:any)
    {
      this.router.navigate(['trhistory',bankNo])
    }

    get getFromControl() {
      return this.withDepForm.controls;
    }

  }

