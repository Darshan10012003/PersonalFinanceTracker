import { NgModule } from '@angular/core';
import { NewaccountComponent } from './Components/newaccount/newaccount.component';
import {  RouterModule, Routes } from '@angular/router';
import { TransactionHistoryComponent } from './Components/transaction-history/transaction-history.component';
import { NavComponent } from './Components/nav/nav.component';
import { HomeComponent } from './Components/home/home.component';


const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'newAccount',component:NewaccountComponent},
  {path:'trhistory',component:TransactionHistoryComponent},
  {path:'nav',component:NavComponent},
  {path:'home',component:HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
