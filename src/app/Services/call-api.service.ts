import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  constructor(private http : HttpClient) { }
  
  baseUrl="http://localhost:7777/wallet/"

  newAccount(data : any):Observable<any>{
    return this.http.post(this.baseUrl+"saveWalletData",data,{responseType :'text'});
  }

  withDepMoney(id : string,money : any){
    console.log(money);
    
    return this.http.post(this.baseUrl+"depositeMoney/"+id,money,{responseType:'text'})
  }

}
