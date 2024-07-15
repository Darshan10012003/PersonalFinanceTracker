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
import { authGuardGuard } from './AuthGuard/auth-guard.guard';
import { DashboardComponent } from './Components/dashboard/dashboard.component';



const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'newAccount',component:NewaccountComponent,canActivate:[authGuardGuard]},
  {path:'trhistory',component:TransactionHistoryComponent,canActivate:[authGuardGuard]},
  {path:'trhistory/:bankNo',component:TransactionHistoryComponent,canActivate:[authGuardGuard]},
  {path:'dashboard' , component:DashboardComponent , canActivate:[authGuardGuard]},
  {path:'dashboard/:adharno' , component:DashboardComponent , canActivate:[authGuardGuard]},
  {path:'nav',component:NavComponent},

  {path:'home',component:HomeComponent},

  {path:'register',component : RegisterComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'withdrawAndDeposit',component:WithdrawAndDepositeByCashComponent,canActivate:[authGuardGuard]},
  {path:'forgetpassword',component:ForgetpasswordComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
