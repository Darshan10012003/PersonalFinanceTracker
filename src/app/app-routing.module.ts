import { NgModule } from '@angular/core';
import { NewaccountComponent } from './Components/newaccount/newaccount.component';
import {  RouterModule, Routes } from '@angular/router';
import { TransactionHistoryComponent } from './Components/transaction-history/transaction-history.component';

const routes: Routes = [
  {path:'',redirectTo:'/newAccount',pathMatch:'full'},
  {path:'newAccount',component:NewaccountComponent},
  {path:'trhistory',component:TransactionHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
