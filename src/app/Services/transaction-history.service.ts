import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionHistoryService {

  BASE_URL = "http://localhost:7777/wallet/";

  GET_WALLET_DATA_BY_WALLET_ID = this.BASE_URL + "getDataByTransactionEntity/2"

  constructor(private http: HttpClient) { }

  GetTransactionHistorybyWalletId() :Observable<any>{
    return this.http.get(this.GET_WALLET_DATA_BY_WALLET_ID, { responseType: 'json' })
  }
  GetTransactionHistoryby_BankAccNo(bankNo : any) :Observable<any>{
    return this.http.get(this.BASE_URL + "getDataByTransactionEntity/"+bankNo, { responseType: 'json' })
  }


  
}
