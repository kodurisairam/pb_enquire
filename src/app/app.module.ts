import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { ImageCropperModule } from 'ngx-image-cropper';
import { OwlModule } from 'ngx-owl-carousel';

import { AgmCoreModule } from '@agm/core';
import { NguCarouselModule } from '@ngu/carousel';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoaderService } from './core/loader.service';
import { InitialService } from './core/initial.service';
import { LoanComponent } from './components/vendor/loan/loan.component';
import { ProjectFinanceComponent } from './components/vendor/project-finance/project-finance.component';
import { LoansComponent } from './components/vendor/loans/loans.component';
import { CibilComponent } from './components/vendor/cibil/cibil.component';
import { CctvComponent } from './components/vendor/cctv/cctv.component';
import { InteriorDesignEnquiryComponent } from './components/vendor/interior-design-enquiry/interior-design-enquiry.component';
import { SolarEnquiryComponent } from './components/vendor/solar-enquiry/solar-enquiry.component';
import {ShareButtonsModule} from 'ngx-sharebuttons/buttons';
import {ShareIconsModule} from 'ngx-sharebuttons/icons';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    
    LoanComponent,
    ProjectFinanceComponent,
    LoansComponent,
    CibilComponent,
    CctvComponent,
    InteriorDesignEnquiryComponent,
    SolarEnquiryComponent,
   

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CommonModule,
    FormsModule,
    NgbModalModule,
    ReactiveFormsModule,
    ShareButtonsModule.withConfig({
      debug:true
    }),
    ShareIconsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxIntlTelInputModule,
    NgxPaginationModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 10000
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDWb9Xof86boGQouKT9E4hv0ipuu7LyQJM',
      libraries: ['places']
    }),
    NguCarouselModule,
    ImageCropperModule,
    OwlModule
  ],
  providers: [
    LoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      deps: [InitialService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initEnvironment,
      deps: [LoaderService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
export function appInit(initService: InitialService): Function {
  return () => initService.loadApp();
}
export function initEnvironment(loaderService: LoaderService): Function {
  return () => loaderService.loadLocation();
}
