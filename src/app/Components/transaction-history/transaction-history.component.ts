import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionHistoryService } from 'src/app/Services/transaction-history.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CallApiService } from 'src/app/Services/call-api.service';


@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  withDepForm: any
  TransactionDataBywalletId: any;
  constructor(private trService: TransactionHistoryService, private serviceobj: CallApiService, private route: Router, private fb: FormBuilder) {
    this.withDepForm = this.fb.group({
      item: [''],
      accontNumber: ['', Validators.required],
      bankDeposite: ['', Validators.required]
    })
  }

  withdrawArr: string[] = ['Withdraw', 'Deposit'];
  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;

  }


  withDepButton() {

    let payload = {
      bankDeposite: this.withDepForm.value.bankDeposite
      // "bankDeposit":200.00
    }
    this.serviceobj.withDepMoney(this.withDepForm.value.accontNumber, payload).subscribe({
      next: (resp) => {
        console.log(resp);

      }
    })
  }

  GetTransactionHistorybyWalletId() {
    this.trService.GetTransactionHistorybyWalletId().subscribe({
      next: (resp) => {
        this.TransactionDataBywalletId = resp; // Assuming resp is an array of transaction data
        console.log("TransactionDataBywalletId FROM WALLET BY ID--> ", resp);
      },
      error: (err) => {
        console.log("ERROR--->", err)
      }
    })

  }

}
