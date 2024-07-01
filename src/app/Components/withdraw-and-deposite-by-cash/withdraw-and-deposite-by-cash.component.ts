import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CallApiService } from 'src/app/Services/call-api.service';
import { TransactionHistoryService } from 'src/app/Services/transaction-history.service';

@Component({
  selector: 'app-withdraw-and-deposite-by-cash',
  templateUrl: './withdraw-and-deposite-by-cash.component.html',
  styleUrls: ['./withdraw-and-deposite-by-cash.component.css']
})
export class WithdrawAndDepositeByCashComponent {

  withDepForm: any
  TransactionDataBywalletId: any;
  withdrawArr: string[] = ['Withdraw', 'Deposit'];
  constructor(private trService: TransactionHistoryService, private serviceobj: CallApiService, private fb: FormBuilder) {
    this.withDepForm = this.fb.group({
      item: [''],
      accontNumber: ['', Validators.required],
      bankDeposite: ['', Validators.required]
    })
  }

    withDepButtons(){
      let payload = {
        bankDeposite: this.withDepForm.value.bankDeposite
      }
      this.serviceobj.withDepMoney(this.withDepForm.value.accontNumber, payload).subscribe({
        next: (resp) => {
          console.log(resp);

        }
      })
    }
  }

