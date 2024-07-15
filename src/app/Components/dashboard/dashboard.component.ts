import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CallApiService } from 'src/app/Services/call-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit{

adharNumberFromRoute : any;
AdharData:any;
  constructor (private service : CallApiService , private router : Router , private activatedRoute : ActivatedRoute )
  {
   
  }

  ngOnInit(): void {
    this.adharNumberFromRoute = this.activatedRoute.snapshot.params['adharno']
    this.service.DashboardDataByAdhar(this.adharNumberFromRoute).subscribe(
      {
        next:(resp)=>{
          this.AdharData=resp;
          console.log(resp)
        },
        error:(err)=>
        {
          console.log("ERROR FROM DASHBOARD COMPONENT NG ONINIT ---> " + err);
        }
      })
  }

DepositeMoney()
{
  this.router.navigate(['withdrawAndDeposit'])
}


}
