import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { RouterExtService } from './common/services/router-ext.service';
import { RsbLookupModel } from './common/model/rsb-lookup.model';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'rsb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  openModalSubscription: Subscription;
  routerSubscription: Subscription;
  loading: boolean = false;
  hideFooter: boolean = false;
  hideMainSidebar: boolean = false;
  hideSidebar: boolean = false;
  hidePropertyBar: boolean = false;
  hidePgBar:boolean=false;
  hideRentBar:boolean=false;
  hideFooterMob: boolean = false;
  hide:boolean = false;
  isMobileLayout: boolean = false;
  hideReviewsRating:boolean=false;
  hideHeaderNavForSearchPropInAssociate:boolean=false;
  hideHeaderNavForLogin:boolean=false;
  
  constructor(
    private routerExtService: RouterExtService,
    private lookupModel: RsbLookupModel,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: any
  ) {
    this.lookupModel.isBrowser = isPlatformBrowser(platformId);
    this.routerSubscription = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
         this.hideMainSidebar = val.url.indexOf('/addCompany') !== -1 ? true : false;
         this.hideSidebar = val.url.indexOf('/addProject') !== -1 ? true : false;
          this.hidePropertyBar = val.url.indexOf('/post-property') !== -1 ? true : false;
          this.hidePropertyBar = val.url.indexOf('/post-property') !== -1 ? true : false;
          this.hideReviewsRating = val.url.indexOf('/reviewsAndRatings') !== -1 ? true : false;

          this.hidePgBar = val.url.indexOf('/addPg') !== -1 ? true : false;
          this.hideRentBar = val.url.indexOf('/addRent') !== -1 ? true : false;
          this.hideHeaderNavForSearchPropInAssociate=val.url.indexOf('/searchProp')!== -1?true:false;
          this.hideHeaderNavForLogin = val.url === '/' || val.url === '/login'|| val.url === '' || val.url.trim() === '' || val.url ==='/forgotpassword';




      }
    })
  }

  ngOnInit() {
  }
}
