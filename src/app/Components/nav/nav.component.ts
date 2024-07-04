import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private router: Router) { }

  logout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout it!"
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('Token');
        this.router.navigateByUrl('/login');
        Swal.fire({
          title: "Logout!",
          text: "Logout Successfully.",
          icon: "success"
        });
      }

    }
    );
  
  }}
