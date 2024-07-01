import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionHistoryService } from 'src/app/Services/transaction-history.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CallApiService } from 'src/app/Services/call-api.service';

import { MatTableModule } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';



@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  withDepForm: any
  displayedColumns: string[] = ['tRid', 'tRaccountNo', 'tRaccountType',
    'tRsenderAccountNo', 'tRdescription', 'transactionTime', 'tRname', 'tRstatus', 'tRbalance', 'walletId'];
  TransactionDataBywalletId: any;

    // status: Boolean = true;
    dataSource = new MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    constructor(private trService : TransactionHistoryService, private route : Router, private fb : FormBuilder)
    {

    }


    ngOnInit(): void {

      this.GetTransactionHistorybyWalletId()
      // this.dataSource.paginator = this.paginator;

    }




    // GetTransactionHistorybyWalletId() {
    //   this.trService.GetTransactionHistorybyWalletId().subscribe({
    //     next: (resp) => {
    //       this.TransactionDataBywalletId = resp; // Assuming resp is an array of transaction data
    //       console.log("TransactionDataBywalletId FROM WALLET BY ID--> ", resp);
    //     },
    //     error: (err) => {
    //       console.log("ERROR--->", err)
    //     }


    //   }
  
  GetTransactionHistorybyWalletId()
  {
          this.trService.GetTransactionHistorybyWalletId().subscribe({
            next: (resp) => {
              this.dataSource.data = resp
              this.dataSource.paginator = this.paginator;
              console.log("TransactionDataBywalletId FROM WALLET BY ID--> ", this.dataSource);
            },
            error: (err) => { console.log("ERROR--->", err) }

          })
        }

  isFailed(status : any)
  {
          if(status === 'FAILED') {
        return 'failed-row';
      }
      return '';
    }

    getFormattedBalance(element: any): string {
      if (element.trname === 'Deposite' && element.trstatus === 'SUCCESS') {
        return '+' + element.trbalance;
      } else if (element.trname === 'WITHDRAW' && element.trstatus === 'SUCCESS') {
        return '-' + element.trbalance;
      } else {
        return element.trbalance.toString(); // Default behavior if no conditions are met
      }
    }

  }


