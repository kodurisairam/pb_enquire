import { Component, OnInit, OnDestroy, ChangeDetectorRef, OnChanges, SimpleChanges, AfterViewInit, HostListener} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { RsbLookupModel } from 'src/app/common/model/rsb-lookup.model';
import { MessageService, BUS_EVENTS } from 'src/app/common/events/message.service';
import { Subscription } from 'rxjs';
import { RsbService } from 'src/app/service/rsb.service';
import { Message } from 'src/app/common/events/message';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { APIURL} from 'src/app/common/api-url.constants';


@Component({
  selector: 'rsb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  openNavFlag: boolean = false;
  countryList: Array<any> = [];
  routerSubscription: Subscription;
  selectedCountry: any;
  selectedCodeId: string = '';
  loginSubscription: Subscription;
  logoutSubscription: Subscription;
  moduleSubscription: Subscription;
  locationSubscription: Subscription;
  userLoggedFlag: boolean = false;
  moduleList: Array<any> = [];
  selectedModule: any = {};
  headerForm: FormGroup;
  visibleDropdown:boolean=false;
  // showHeaderForRentSearch:boolean=true;
  // showHeaderForprojectSearch:boolean=true;
  // showHeaderForPgHostelsSearch:boolean=true;


  constructor(
    private modalService: NgbModal,
    private router: Router,
    public lookupModel: RsbLookupModel,
    private messageService: MessageService,
    private rsbService: RsbService,
    private toastrService: ToastrService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
   
   }
 

 


  ngOnInit(): void {
   
    this.countryList = this.lookupModel.getCountryList();
    this.selectedCountry = this.lookupModel.getCountry();
    this.selectedCodeId = this.selectedCountry.codeId;
    this.moduleList = this.lookupModel.getModuleList();
    if (this.lookupModel.getModule()) {
      this.selectedModule = this.lookupModel.getModule();
    } else {
      this.selectedModule = {
        moduleId: this.selectedCountry.moduleId
      };
    }
    this.headerForm = this.fb.group({
      country: [this.selectedCountry.codeId],
      module: [this.selectedModule && this.selectedModule.moduleId ? this.selectedModule.moduleId : '']
    });
    if (!this.moduleList || this.moduleList.length === 0) {
      this.getModules();
    }

    this.userLoggedFlag = this.lookupModel.getCustomerId() ? true : false;
    this.loginSubscription = this.messageService.onMessage(BUS_EVENTS.LOGIN, (flag) => {
      if (flag) {
        this.userLoggedFlag = true;
      }
    });
    this.logoutSubscription = this.messageService.onMessage(BUS_EVENTS.LOGOUT, (flag) => {
      if (flag) {
        this.userLoggedFlag = false;
        this.toastrService.warning('Please login again to continue...');
      }
    });
    this.moduleSubscription = this.messageService.onMessage(BUS_EVENTS.MODULE_CHANGE, (val) => {
      if (val && val !== this.selectedModule['moduleId']) {
        this.selectedModule = this.moduleList.find(item => item.moduleId === val);
        this.module.setValue(val);
        this.lookupModel.setModule(this.selectedModule);
      }
    });
    this.locationSubscription = this.messageService.onMessage(BUS_EVENTS.LOCATION_CHANGE, (val) => {
      if (val) {
        this.selectedCodeId = val;
        this.country.setValue(val);
        // this.selectCountry();
      }
    });

    this.formChanges();
    // this.routerSubscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.showHeaderForRentSearch = event.url.indexOf('/listings/') !== -1;
    //     this.showHeaderForprojectSearch = event.url.indexOf('/project/') !== -1;
    //     this.showHeaderForPgHostelsSearch = event.url.indexOf('/pg/') !== -1;
    //   }
    // });
  }
 

 
  
  // ngAfterViewInit(): void {
   
  // }
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.routerSubscription = this.router.events.subscribe((val) => {
  //     if (val instanceof NavigationEnd) {
  //         this.showHeaderForRentSearch=val.url.indexOf('/listings/')!== -1?true:false;
  //         this.showHeaderForprojectSearch=val.url.indexOf('/project/')!== -1?true:false;
  //         this.showHeaderForPgHostelsSearch=val.url.indexOf('/pg/')!== -1?true:false;

          
  //         // this.hideHeaderForSearch=val.url.indexOf('/pg/')!== -1?true:false;

          



  //     }
  //   })
  // }

  formChanges(): void {
    this.country.valueChanges.subscribe(val => {
      if (val) {
        this.selectedCountry = this.countryList.find(country => country.codeId === val);
        this.lookupModel.setCountry(this.selectedCountry);
        this.getModules(true);
        // this.openNav('');
      }
    });

    this.module.valueChanges.subscribe(val => {
      // if(val && val !== this.selectedModule.moduleId) {
      //   const module = this.moduleList.find(item => item.moduleId === val);
      //   this.selectedModule = module;
      //   this.lookupModel.setModule(module);
      //   this.router.navigate(['']);
      //   this.messageService.sendMessage(new Message(BUS_EVENTS.MODULE_CHANGE, module.moduleId));
      //   this.cdr.detectChanges();
      // }
      this.selectModule(val);
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
   
    this.loginSubscription.unsubscribe();
    this.locationSubscription.unsubscribe();
    this.moduleSubscription.unsubscribe();
  }
  profile() : void {
    // window.location.href= APIURL.WEBSITE_URL+'/account/myprofile'
    this.closeDropdown();
    this.router.navigate(['associateMyProfile'])
  }
  myfavorites(){
    this.closeDropdown();
    window.location.href= APIURL.WEBSITE_URL+'/account/favorites'
  }
  favoriteListing(){
    this.closeDropdown();
    this.router.navigate(['favorite-listings'])

    // window.location.href= APIURL.WEBSITE_URL+'/account/favorites'
  }

  favoriteProjects(){
    this.closeDropdown();
    this.router.navigate(['favorite-projects'])

    // window.location.href= APIURL.WEBSITE_URL+'/account/favorites'
  }
  favoritePgHostels(){
    this.closeDropdown();
    this.router.navigate(['favorite-hostels'])

    // window.location.href= APIURL.WEBSITE_URL+'/account/favorites'
  }
  getLeadsForProperties(){
    this.closeDropdown();
    this.router.navigate(['leads-properties'])

  }
  getLeadsForProjects(){
    this.closeDropdown();
    this.router.navigate(['leads-projects'])

  }
  getLeadsForPgHostels(){
    this.closeDropdown();
    this.router.navigate(['leads-pgHostels'])

  }
  changepwd(){
    this.closeDropdown();
    this.router.navigate(['change-password'])
    // window.location.href= APIURL.WEBSITE_URL+'/account/changepassword'
  }
  getModules(emitCountryChange: boolean = false): void {
    this.moduleList = [];
    this.rsbService.getActiveModules().subscribe((rsp) => {
      if (rsp.statusCode === 0) {
        this.moduleList = rsp.contents;
        const module = this.moduleList.find(item => item.isDefault);
        this.lookupModel.setModuleList(this.moduleList);
        if (emitCountryChange) {
          this.messageService.sendMessage(new Message(BUS_EVENTS.COUNTRY_CHANGE, true));
          this.cdr.detectChanges();
          const url = this.route.snapshot['_routerState'].url;
          if (url && url !== '/') {
            this.router.navigate(['']);
          }
        }
        this.module.setValue(module.moduleId);
        // this.selectModule(module);
      }
    });
  }
profileDropdown(){
  this.visibleDropdown=!this.visibleDropdown

}
closeDropdown() {
  this.visibleDropdown = false;
}
  login(): void {
    this.openNavFlag = false;
    const callback = () => {
      let user = this.lookupModel.getLoggedUser();
      if (user.activeStatus === 0 || !user.activeStatus) {
        this.openNav('profile');
      }
    };
    this.attemptLogin(callback);
  }

  home(): void {
    window.location.href="https://pillarblocks.com"
  }
  
  logout(): void {
    this.rsbService.logout().subscribe((rsp) => {
      if (rsp.statusCode === 0) {

        this.lookupModel.clearLoggedUser();
        this.lookupModel.setToken(null);
        window.location.href = "https://pillarblocks.com"
      }
    })

  }

  openNav(route: string, value?: any): void {
    this.openNavFlag = false;
    if (value) {
      this.router.navigate([route, value]);
    } else {
      this.router.navigate([route]);
    }
  }

  postProperty(): void {
    const callback = () => {
      this.router.navigate(['post-property', 'new']);
      console.log("get logged user is", this.lookupModel.getLoggedUser())
      if (this.lookupModel.getLoggedUser().activeStatus) {


        switch (this.lookupModel.getLoggedUser().vendorTypeName) {
          case "Owner":
            this.router.navigate(['post-property', 'new']);


            break;
          case "Agent":
            this.router.navigate(['Agent-post-property', 'new'])



            break;
          case "Builder":
            this.router.navigate(['project', 'new'])


            break;


          default: 'none'


        }


      } else {
        this.lookupModel.setRedirection('postproperty');
        // this.modalService.open(VendortypeComponent)
        //   .result.then((rslt) => {
        //     if (rslt) {

        //       callback();
        //     }
        //   });

      }
    };

    if (this.userLoggedFlag) {
      callback();
    } else {
      this.attemptLogin(callback);

    }
  }

  attemptLogin(callback: any): void {
    // const modalRef = this.modalService.open(LoginComponent);
    // modalRef.result.then((rslt) => {
    //   if (rslt) {
    //     callback();
    //   }
    // });
  }

  selectCountry(): void {
    this.selectedCountry = this.countryList.find(country => country.codeId === this.selectedCodeId);
    this.lookupModel.setCountry(this.selectedCountry);
    this.getModules(true);
    this.openNav('');
  }

  selectModule(moduleId: any): void {
    if (moduleId && moduleId !== this.selectedModule.moduleId) {
      const module = this.moduleList.find(item => item.moduleId === moduleId);
      this.selectedModule = module;
      this.lookupModel.setModule(module);
      this.router.navigate(['']);
      this.messageService.sendMessage(new Message(BUS_EVENTS.MODULE_CHANGE, module.moduleId));
      this.cdr.detectChanges();
    }
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-menu') && !target.closest('.dropdown-toggle')) {
      this.closeDropdown(); 
    }
  }

  get country() { return this.headerForm.get('country'); }
  get module() { return this.headerForm.get('module'); }
}
