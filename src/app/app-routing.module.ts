import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotpasswordComponent } from './shared/components/forgotpassword/forgotpassword.component';
import { LoanComponent } from './components/vendor/loan/loan.component';
import { AuthGuard } from './common/guards/auth-guard';

import { CibilComponent } from './components/vendor/cibil/cibil.component';
import { ProjectFinanceComponent } from './components/vendor/project-finance/project-finance.component';
import { LoansComponent } from './components/vendor/loans/loans.component';

import { CctvComponent } from './components/vendor/cctv/cctv.component';
import { InteriorDesignEnquiryComponent } from './components/vendor/interior-design-enquiry/interior-design-enquiry.component';
import { SolarEnquiryComponent } from './components/vendor/solar-enquiry/solar-enquiry.component';


const routes: Routes = [

  {
    path: '', component:ProjectFinanceComponent ,
  },
 
  {
    path:'projectFinance',
    component:ProjectFinanceComponent
  },
  
  {
    path:'loans',
    canActivate:[AuthGuard],
    component:LoansComponent
  },
 
  {
    path:'cctvEnquiry',
    canActivate:[AuthGuard],
    component:CctvComponent
  },
  {
    path:'interiorDesignEnquiry',
    canActivate:[AuthGuard],
    component:InteriorDesignEnquiryComponent
  },
  {
    path:'solarEnquiry',
    canActivate:[AuthGuard],
    component:SolarEnquiryComponent
  },
  {
    path:'cibil',
    canActivate:[AuthGuard],
    component:CibilComponent
  },

  {
    path: 'loan',
    canActivate:[AuthGuard],
    component:LoanComponent
  },
 

  {
    path:'forgotpassword',
    component:ForgotpasswordComponent
  },
  { path: '**', redirectTo: '/login',pathMatch: 'full' } 
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
