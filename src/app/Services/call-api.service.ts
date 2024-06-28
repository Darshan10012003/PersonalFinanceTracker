import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  constructor(private http : HttpClient) { }
  
  baseUrl="http://localhost:9092/bank/"

  newAccount(data : any):Observable<any>{
    return this.http.post(this.baseUrl+"savedata",data);
  }

}