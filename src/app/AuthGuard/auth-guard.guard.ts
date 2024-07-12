import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router =inject(Router);
  let st= sessionStorage.getItem('token');
  if(st !=null){
    
    return true;
  }
  else{
    router.navigate(['/login']);
   
    return false;
  }
};
