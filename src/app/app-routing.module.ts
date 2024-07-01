import { NgModule } from '@angular/core';
import { NewaccountComponent } from './Components/newaccount/newaccount.component';
import {  RouterModule, Routes } from '@angular/router';
import { TransactionHistoryComponent } from './Components/transaction-history/transaction-history.component';
import { NavComponent } from './Components/nav/nav.component';
import { HomeComponent } from './Components/home/home.component';
import { WithdrawAndDepositeByCashComponent } from './Components/withdraw-and-deposite-by-cash/withdraw-and-deposite-by-cash.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { ForgetpasswordComponent } from './Components/forgetpassword/forgetpassword.component';


const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'newAccount',component:NewaccountComponent},
  {path:'trhistory',component:TransactionHistoryComponent},
  {path:'nav',component:NavComponent},
  {path:'register',component : RegisterComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'withdrawAndDeposit',component:WithdrawAndDepositeByCashComponent},
  {path:'forgetpassword',component:ForgetpasswordComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
