import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'rsb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }


  aboutUs(): void {
    this.router.navigate(['aboutus'])
  }

  terms(): void {
    this.router.navigate(['terms-conditions'])
  }

  privacy(): void {
    this.router.navigate(['privacy-policy'])
  }

  cancellation(): void {
    this.router.navigate(['Cancellation-Refundpolicy'])
  }
  shipping(): void{
    this.router.navigate(['shipping-policy'])



  }

}
