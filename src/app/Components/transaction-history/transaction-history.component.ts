import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
  
  // displayedColumns: string[] = ['TransactionId', 'tRname', 'TransactionaccountNo', 'TransactionAmount', 'SenderAccountNumber', 'tRdescription' , 'tRstatus' , 'transactionTime', 'walletId'];
  TransactionDataBywalletId : any;
  // TransactionDataBywalletId: any[] = [];

  // dataSource!: MatTableDataSource<TransactionHistoryComponent>;
  // dataSource!: MatTableDataSource<any>;
  
  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private trService : TransactionHistoryService , private route : Router , private fb : FormBuilder)
  {
    // this.dataSource = new MatTableDataSource<any>(this.TransactionDataBywalletId);
    // this.TransactionDataBywalletId = this.fb.group({

    // })
  }
  ngOnInit(): void {
    this.GetTransactionHistorybyWalletId()
    // this.dataSource.paginator = this.paginator;
  }
  
  GetTransactionHistorybyWalletId()
  {
    this.trService.GetTransactionHistorybyWalletId().subscribe({
      next: (resp)=>
      {
        console.log(resp);
        
        this.TransactionDataBywalletId = resp; // Assuming resp is an array of transaction data
        console.log( "TransactionDataBywalletId FROM WALLET BY ID--> " , this.TransactionDataBywalletId);
      },
      error:(err)=>
      {
        console.log("ERROR--->" , err)
      }

    })

  }

}
