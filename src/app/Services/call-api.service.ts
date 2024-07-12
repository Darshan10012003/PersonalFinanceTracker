import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:7777/wallet/"

  newAccount(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "saveWalletData", data, { responseType: 'text' });
  }

  withDepMoney(id: string, money: any) {
    return this.http.post(this.baseUrl + "depositeMoney/" + id, money, { responseType: 'text' })
  }
  AuthBaseUrl = "http://localhost:8888/auth/"

  register(regdata: any) {
    return this.http.post(this.AuthBaseUrl + "register", regdata, { responseType: 'text' });
  }

  login(logindata: any) {
    return this.http.post(this.AuthBaseUrl + "login", logindata, { responseType: 'json' });
  }

  sendEmail(forgetData: any): Observable<any> {
    return this.http.post(this.AuthBaseUrl + "forgetPasswordUsingSendEmail", forgetData, { responseType: 'text' });
  }

  verifyOtp(emailId: string, otp: any, birthDate: any): Observable<any> {
    return this.http.get(this.AuthBaseUrl + "verifyotp/" + emailId + "/" + otp + "/" + birthDate, { responseType: 'text' })
  }

  newPasswordEnter(emailId: string, password: any) {
    return this.http.get(this.AuthBaseUrl + "forgetPasswordEnter"+"/" + emailId + "/" + password, { responseType: 'text' })
  }
  getToken() {
    return sessionStorage.getItem('token')
  }


}
