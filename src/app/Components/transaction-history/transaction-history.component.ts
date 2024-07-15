import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionHistoryService } from 'src/app/Services/transaction-history.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  displayedColumns: string[] = ['trid', 'traccountNo', 'traccountType', 
   'trsenderAccountNo' , 'trdescription', 'transactionTime', 'trname' , 'trstatus', 'trbalance','walletId'];
  TransactionDataBywalletId : any;
  // status: Boolean = true;
  dataSource = new MatTableDataSource<any>;
  bankAccountNumber: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private trService : TransactionHistoryService , private activateRoute : ActivatedRoute , private fb : FormBuilder)
  {
    // this.TransactionDataBywalletId = this.fb.group({
    //   tRid: [''],
    //   tRname: [''],
    //   tRaccountNo: [''],
    //   tRaccountType: [''],
    //   tRbalance: [''],
    //   tRsenderAccountNo: [''],
    //   tRdescription: [''],
    //   tRstatus: [''],
    //   transactionTime: [''],
    //   walletId: ['']
    // });
  }
  ngOnInit(): void {
    this.bankAccountNumber =  this.activateRoute.snapshot.params['bankNo']
    this.GetTransactionHistorybyWalletId()
 
  }
  
  GetTransactionHistorybyWalletId()
  {
    this.trService.GetTransactionHistoryby_BankAccNo(this.bankAccountNumber).subscribe({
      next: (resp)=>
      {
        this.dataSource.data = resp
        this.dataSource.paginator = this.paginator; 
        console.log( "TransactionDataBywalletId FROM WALLET BY ID--> " , this.dataSource);
      },
      error:(err)=>
      {   console.log("ERROR--->" , err) }
    })
  }

  isFailed(status : any)
  {
    if (status === 'FAILED') {
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
