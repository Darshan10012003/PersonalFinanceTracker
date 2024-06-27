import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewaccountComponent } from './Components/newaccount/newaccount.component';

const routes: Routes = [
  {path:'',redirectTo:'/newAccount',pathMatch:'full'},
  {path:'newAccount',component:NewaccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
