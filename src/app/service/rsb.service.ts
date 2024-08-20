import { Injectable } from '@angular/core';
import { IServiceMethodMap, DataService } from '../common/services/data.service';
import { RsbLookupModel } from '../common/model/rsb-lookup.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageService, BUS_EVENTS } from '../common/events/message.service';
import { tap } from 'rxjs/operators';
import { Message } from '../common/events/message';
import { Subject } from 'rxjs';
import { AnyARecord } from 'dns';
export const SRV_OPS: IServiceMethodMap = {

  sendMobileOtp: {
    method: 'otp/sendMobileOtp',
  },
  resendMobileOtp: {
    method: 'otp/resendMobileOtp'
  },
  verifyMobileOtp: {
    method: 'otp/verifyMobileOtp'
  },
  associateCustomerVerifyMobileOtp: {
    method: 'otp/associateCustomerVerifyMobileOtp'
  },
  addListingsFavourite: {
    method: 'associate/addListingsFavourite'
  },
  addProjectsFavourite: {
    method: 'associate/addProjectsFavourite'
  },
  addPgToFavourite: {
    method: 'associate/addPgToFavourite'
  },
  pgCustomerVerifyMobileOtp: {
    method: 'associate/pgCustomerVerifyMobileOtp'
  },


  requestSiteVisit: {
    method: 'associate/addRequestSiteVisit'
  },
  requestSiteVisitForProjectList: {
    method: 'associate/addRequestSiteVisitForProjectList'
  },
  requestSiteVisitForPgList: {
    method: 'associate/addRequestSiteVisitForPgList'
  },

  isMobileExists: {
    method: 'isMobileExists'
  },
  sendEmailOtp: {
    method: 'otp/sendEmailOtp'
  },
  resendEmailOtp: {
    method: 'otp/resendEmailOtp'
  },
  verifyEmailOtp: {
    method: 'otp/verifyEmailOtp'
  },
  isEmailExists: {
    method: 'isEmailExists'
  },
  favoriteProperties: {
    method: 'associate/addFavoriteProperties'
  },
  favoriteProjects: {
    method: 'associate/addfavoriteProjects'
  },
  favoritePghostel: {
    method: 'associate/addfavoritePghostel'
  },


  changePassword: {
    method: 'associate/changePassword'
  },
  myTeamMembers: {
    method: 'associate/addTeamMembers'
  },
  isMobileExist: {
    method: 'associate/isMobileExists'
  },
  getTeamMembers: {
    method: 'associate/getTeamMembers'
  },
  updateProfile: {
    method: 'updateProfile'
  },
  updateAssociatePersonalDetails: {
    method: 'associate/updateAssociatedPersonalDetails'
  },
  updateAssociateAddress: {
    method: 'associate/updateAssociatedAddress'
  },
  bankAccountDetails: {
    method: 'associate/bankAccountDetails'
  },
  panAccountDetails: {
    method: 'associate/panAccountDetails'
  },
  getAssociateProfileInfo: {
    method: 'associate/getAssociateProfileInfo'
  },
  agentProfile: {
    method: 'updateProfessionalDetails'
  },
  getAllListings: {
    method: 'getAllListings'
  },
  getFavoriteProperties: {
    method: 'associate/getFavoriteProperties'
  },
  getFavoriteProjects: {
    method: 'associate/getFavouriteProjects'
  },
  getFavoriteHostels: {
    method: 'associate/getFavouriteHostels'
  },
  getLeadsForProperties: {
    method: 'associate/getLeadsForProperties'
  },
  getLeadsForProjects: {
    method: 'associate/getLeadsForProjects'
  },
  getLeadsForHostels: {
    method: 'associate/getLeadsForHostels'
  },
  getAllListingsForPg: {
    method: 'pgHostels/getHostelsOfCustomer'
  },
  getActiveModules: {
    method: 'master/getActiveModules'
  },
  getActiveModulesForPostProperty: {
    method: 'master/getActiveModulesForPostProperty'
  },
  getActiveCategories: {
    method: 'categories/getActiveCategories'
  },
  getAllPropertiesForCategories: {
    method: 'categories/getAllPropertiesForCategories'
  },
  getCategoriesForEdit: {
    method: 'getCategoriesForEdit'
  },
  getActiveMeasurements: {
    method: 'master/getActiveMeasurements'
  },
  getDashboardCount: {
    method: 'master/getModulesCountForDashboard'
  },
  addUpdateListings: {
    method: 'addUpdateListings'
  },
  addUpdatePgListings: {
    method: 'pgHostels/addPgHostel'
  },
  getAllMainModules: {
    method: 'admin/getAllMainModules'
  },
  getProfessionalDetails: {
    method: 'getProfessionalInfo'
  },
  publishPlan: {
    method: 'publishPlan'
  },
  sendMobileOtpForForgotPassword:{
    method: 'otp/sendMobileOtpForAssociateForgotPassword',
  },
  forgotPwdVerifyMobileOtp: {
    method: 'otp/associateForgotPwdVerifyMobileOtp'
  },
  getListingBasedOnListingId: {
    method: 'getListingBasedOnListingId'
  },
  getCustomerListingsBasedOnListingId: {
    method: 'getCustomerListingsBasedOnListingId'
  },
  getListingsBasedOnFilters: {
    method: 'getListingsBasedOnFilters'
  },
  loanApplication: {
    method: 'loans/addLoans'
  },
  addProjectFinance: {
    method: 'enquires/addProjectFinance'
  },
  myLeads: {
    method: 'getLeadInfo'
  },
  myViewLeads: {
    method: 'getViewLeadInfo'
  },
  getAllAttribtesForWebsiteFilters: {
    method: 'categories/getAllAttribtesForWebsiteFilters'
  },
  getActiveBudgetsForFilters: {
    method: 'master/getActiveBudgetsForFilters'
  },
  addListingsToAccount: {
    method: 'addListingsToAccount'
  },
  getListingsInfo: {
    method: 'getListingsInfo'
  },

  getContactInfo: {
    method: 'getContactInfo'
  },
  getListingsBasedOnCountry: {
    method: 'getListingsBasedOnCountry'
  },
  getListingsBasedOnCountryAndCity: {
    method: 'getListingsBasedOnCountryAndCity'
  },
  getAllLatestListings: {
    method: 'master/getAllLatestListings'
  },
  getActiveVendorTypes: {
    method: 'master/getActiveVendorTypes'
  },
  customerLogin: {
    method: 'customerLogin'
  },
  associateCustomerLogin: {
    method: 'associate/associateCustomerLogin'
  },
  updatevendortype: {
    method: 'updatevendortype'
  },
  getListingsBasedOnFiltersForPagination: {
    method: 'getListingsBasedOnFiltersForPagination'
  },
  getLatestListingsBasedOnSubModules: {
    method: 'getActiveHomePageCategoriesForHomePage'
  },
  getAllPropertiesForModules: {
    method: 'master/getAllPropertiesForModules'
  },
  addBuilderCompany: {
    method: 'builder/addBuilderCompany'
  },
  addPreviousProject: {
    method: 'builder/addPreviousProject'
  },
  addOngoingProject: {
    method: 'builder/addOngoingProject'
  },
  getBuilderCompanies: {
    method: 'builder/getBuilderCompanies'
  },
  addViewPgListingsToAccount: {
    method: 'pgHostels/addPgViewListingsToAccount'
  },
  updateBuilderCompany: {
    method: 'builder/updateBuilderCompanyp'
  },
  addProjectToAccount: {
    method: 'addProjectToAccount'
  },
  getHostelDetailsBasedOnHostelId: {
    method: 'pgHostels/getHostelDetailsBasedOnHostelId'
  },
  addUpdateProject: {
    method: 'builder/addBuilderProperty'
  },
  getCustomerProjectsBasedOnProjectId: {
    method: 'builder/getProjectBasedOnProjectId'
  },
  addViewListingsToAccount: {
    method: 'addViewListingsToAccount'
  },
  logout: {
    method: 'updateMultipleRecords'
  },
  addBuilderProperty: {
    method: 'builder/addBuilderProperty'
  },
  getBuilderProperties: {
    method: 'builder/getBuilderProperty'
  },
  getProjectBasedOnProjectId: {
    method: 'builder/getProjectBasedOnProjectId'
  },

  getAllProjectListings: {
    method: 'builder/getAllProjects'
  },
  myLeadsForPg: {
    method: 'pgHostels/myLeadsForPg'
  },
  myViewLeadsForPg: {
    method: 'pgHostels/myViewLeadsForPG'
  },
  addPgListingsToAccount: {
    method: 'pgHostels/addPgListingsToAccount'
  },
  getBasicAttributesBasedOnName: {
    method: 'master/getBasicAttributesBasedOnName'
  },
  getHostelsForFilters: {
    method: 'pgHostels/getHostelsForFilters'
  },
  getProjectsBasedOnFiltersForTest: {
    method: 'getProjectsBasedOnFiltersForTest'
  },
  getAllPgAttributesForWebsiteFilters: {
    method: 'master/getAllPgAttributesForWebsiteFilters'
  },
  updatePaymentStatus: {
    method: 'associate/updatePaymentStatus'
  },
  updatePlan: {
    method: 'associate/updateSelectedPlan'
  },
}

@Injectable({
  providedIn: 'root'
})
export class RsbService {
  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();
  private queryParamsSource = new BehaviorSubject<any>(null);
  currentParams = this.queryParamsSource.asObservable();

  constructor(
    private lookupModel: RsbLookupModel,
    private dataService: DataService,
    private messageService: MessageService
  ) { }


  setPropertyData(data: any) {
    this.dataSubject.next(data)
  }
  updateParams(params: any) {
    this.queryParamsSource.next(params);
  }

  addUpdateProject(args): Observable<any> {
    args.customerId = this.lookupModel.getLoggedUser().customerId;
    return this.dataService.callPostAPI(SRV_OPS.addUpdateProject, args);
  }

  getProjectsBasedOnFilters(args: any): Observable<any> {

    // if (this.lookupModel.getLoggedUser() && this.lookupModel.getLoggedUser().listings.length > 0) {
    //   args.listings = this.lookupModel.getLoggedUser().listings;

    // } else if (this.lookupModel.getLoggedUser()) {
    //   args.customerId = [this.lookupModel.getLoggedUser().customerId]
    // } else {
    //   args.listings = []
    //   args.customerId = []
    // }

    return this.dataService.callPostAPI(SRV_OPS.getProjectsBasedOnFiltersForTest, args);
  }
  changePassword(args: any): Observable<any> {

    return this.dataService.callPostAPI(SRV_OPS.changePassword, args);
  }
  myTeamMembers(args: any): Observable<any> {

    return this.dataService.callPostAPI(SRV_OPS.myTeamMembers, args);
  }
  isMobileExist(customers): Observable<any> {
    const args={
      mobile:customers.mobileNumber
    }
    return this.dataService.callPostAPI(SRV_OPS.isMobileExist, args);
  }
  getTeamMembers({ }): Observable<any> {

    const args = {
      associateId: this.lookupModel.getLoggedUser().associateId
    }

    return this.dataService.callPostAPI(SRV_OPS.getTeamMembers, args);
  }

  updateBuilderCompany(args): Observable<any> {
    args.customerId = this.lookupModel.getLoggedUser().customerId;
    return this.dataService.callPostAPI(SRV_OPS.updateBuilderCompany, args);
  }

  sendMobileOtp(mobile: string, countryCode: string): Observable<any> {
    const args = {
      mobile: mobile,
      countryCode: countryCode,
      moduleStatus: 2
    };
    return this.dataService.callPostAPI(SRV_OPS.sendMobileOtp, args);
  }

  resendMobileOtp(mobile: string, countryCode: string): Observable<any> {
    const args = {
      mobile: mobile,
      countryCode: countryCode,
      moduleStatus: 2
    };
    return this.dataService.callPostAPI(SRV_OPS.resendMobileOtp, args);
  }
  sendMobileOtpForForgotPassword(mobile: string, countryCode: string): Observable<any> {
    const args = {
      mobile: mobile,
      countryCode: countryCode,
      moduleStatus: 2
    };
    return this.dataService.callPostAPI(SRV_OPS.sendMobileOtpForForgotPassword, args);
  }
  forgotPwdVerifyMobileOtp(otp: string, pwd: string,confirmPwd:string, dialCode?: number, mobile?: string, twoDigitCode?: string): Observable<any> {
    const args = {
      otp: otp,
      moduleStatus: 2,
      password: pwd,
      confirmPwd:confirmPwd,
      countryCode: dialCode,
      mobile: mobile,
      twoDigitCountryCode: twoDigitCode,
      
      ip: this.lookupModel.getUuid()
    };
    return this.dataService.callPostAPI(SRV_OPS.forgotPwdVerifyMobileOtp, args);
    
  }
  addPgListingsToAccount(args: any): Observable<any> {
    args.customerId = this.lookupModel.getCustomerId();
    return this.dataService.callPostAPI(SRV_OPS.addPgListingsToAccount, args);
  }



  getAssociateProfileInfo(): Observable<any> {

    const args = {
      associateId: this.lookupModel.getLoggedUser().associateId
    }

    return this.dataService.callPostAPI(SRV_OPS.getAssociateProfileInfo, args).pipe(tap((rsp) => {
      if (rsp.statusCode === 0) {
        this.lookupModel.setLoggedUser(rsp.contents[0]);
      }
    }));


  }


  updatePlan(args: any): Observable<any> {
    args.associateId = this.lookupModel.getLoggedUser().associateId;
    return this.dataService.callPostAPI(SRV_OPS.updatePlan, args);
  }

  updatePaymentStatus(args: any): Observable<any> {
    args.associateId = this.lookupModel.getLoggedUser().associateId;
    return this.dataService.callPostAPI(SRV_OPS.updatePaymentStatus, args);
  }
  verifyMobileOtp(otp: string, pwd: string, dialCode?: number, mobile?: string, twoDigitCode?: string, firstName?: string, email?: string): Observable<any> {
    const args = {
      associateId: this.lookupModel.getLoggedUser().associateId,
      otp: otp,
      moduleStatus: 2,
      password: pwd,
      countryCode: dialCode,
      mobile: mobile,
      email: email,

      firstName: firstName,
      twoDigitCountryCode: twoDigitCode,
      ip: this.lookupModel.getUuid()
    };
    return this.dataService.callPostAPI(SRV_OPS.verifyMobileOtp, args).pipe(tap((rsp) => {
      if (rsp.statusCode === 0) {
        this.lookupModel.setLoggedUser(rsp.contents[0]);
        this.lookupModel.setToken(rsp.customerToken);
        this.messageService.sendMessage(new Message(BUS_EVENTS.LOGIN, true));
      }
    }));
  }
  associateCustomerVerifyMobileOtp(otp: string, pwd: string, dialCode?: number, mobile?: string, twoDigitCode?: string, firstName?: string, email?: string): Observable<any> {
    const args = {
      associateId: this.lookupModel.getLoggedUser().associateId,
      otp: otp,
      moduleStatus: 2,
      password: pwd,
      countryCode: dialCode,
      mobile: mobile,
      email: email,

      firstName: firstName,
      twoDigitCountryCode: twoDigitCode,
      ip: this.lookupModel.getUuid()
    };
    return this.dataService.callPostAPI(SRV_OPS.associateCustomerVerifyMobileOtp, args).pipe(tap((rsp) => {
      if (rsp.statusCode === 0) {

        this.messageService.sendMessage(new Message(BUS_EVENTS.LOGIN, true));
      }
    }));
  }
  addListingsFavourite(customerId: any, listingId: string, date?: string): Observable<any> {
    const args = {
      associateId: this.lookupModel.getLoggedUser().associateId,
      customerId: customerId,
      listingId: listingId,
      date: date,
      ip: this.lookupModel.getUuid()
    };
    return this.dataService.callPostAPI(SRV_OPS.addListingsFavourite, args).pipe(tap((rsp) => {
      if (rsp.statusCode === 0) {

        this.messageService.sendMessage(new Message(BUS_EVENTS.LOGIN, true));
      }
    }));
  }
  addProjectsFavourite(customerId: any, projectId: string, date?: string): Observable<any> {
    const args = {
      associateId: this.lookupModel.getLoggedUser().associateId,
      customerId: customerId,
      projectId: projectId,
      date: date,
      ip: this.lookupModel.getUuid()
    };
    return this.dataService.callPostAPI(SRV_OPS.addProjectsFavourite, args).pipe(tap((rsp) => {
      if (rsp.statusCode === 0) {

        this.messageService.sendMessage(new Message(BUS_EVENTS.LOGIN, true));
      }
    }));
  }
  addPgToFavourite(customerId: any, hostelId: string, date?: string): Observable<any> {
    const args = {
      associateId: this.lookupModel.getLoggedUser().associateId,
      customerId: customerId,
      date: date,
      hostelId: hostelId,
      ip: this.lookupModel.getUuid()
    };
    return this.dataService.callPostAPI(SRV_OPS.addPgToFavourite, args).pipe(tap((rsp) => {
      if (rsp.statusCode === 0) {

        this.messageService.sendMessage(new Message(BUS_EVENTS.LOGIN, true));
      }
    }));
  }
  requestSiteVisit(listingId: string, date: string, otp: string, pwd: string, dialCode?: number, mobile?: string, twoDigitCode?: string, firstName?: string, email?: string): Observable<any> {
    const args = {
      associateId: this.lookupModel.getLoggedUser().associateId,
      listingId: listingId,
      otp: otp,
      moduleStatus: 2,
      password: pwd,
      countryCode: dialCode,
      mobile: mobile,
      email: email,
      date: date,

      firstName: firstName,
      twoDigitCountryCode: twoDigitCode,
      ip: this.lookupModel.getUuid()
    };
    return this.dataService.callPostAPI(SRV_OPS.requestSiteVisit, args).pipe(tap((rsp) => {
      if (rsp.statusCode === 0) {
        this.lookupModel.setLoggedUser(rsp.contents[0]);
        this.lookupModel.setToken(rsp.customerToken);
        this.messageService.sendMessage(new Message(BUS_EVENTS.LOGIN, true));
      }
    }));
  }
  requestSiteVisitForProjectList(projectId: string, date: string, otp: string, pwd: string, dialCode?: number, mobile?: string, twoDigitCode?: string, firstName?: string, email?: string): Observable<any> {
    const args = {
      associateId: this.lookupModel.getLoggedUser().associateId,
      projectId: projectId,
      otp: otp,
      moduleStatus: 2,
      password: pwd,
      countryCode: dialCode,
      mobile: mobile,
      email: email,
      date: date,

      firstName: firstName,
      twoDigitCountryCode: twoDigitCode,
      ip: this.lookupModel.getUuid()
    };
    return this.dataService.callPostAPI(SRV_OPS.requestSiteVisitForProjectList, args).pipe(tap((rsp) => {
      if (rsp.statusCode === 0) {
        this.lookupModel.setLoggedUser(rsp.contents[0]);
        this.lookupModel.setToken(rsp.customerToken);
        this.messageService.sendMessage(new Message(BUS_EVENTS.LOGIN, true));
      }
    }));
  }
  requestSiteVisitForPgList(hostelId: string, date: string, otp: string, pwd: string, dialCode?: number, mobile?: string, twoDigitCode?: string, firstName?: string, email?: string): Observable<any> {
    const args = {
      associateId: this.lookupModel.getLoggedUser().associateId,
      hostelId: hostelId,
      otp: otp,
      moduleStatus: 2,
      password: pwd,
      countryCode: dialCode,
      mobile: mobile,
      email: email,
      date: date,

      firstName: firstName,
      twoDigitCountryCode: twoDigitCode,
      ip: this.lookupModel.getUuid()
    };
    return this.dataService.callPostAPI(SRV_OPS.requestSiteVisitForPgList, args).pipe(tap((rsp) => {
      if (rsp.statusCode === 0) {
        this.lookupModel.setLoggedUser(rsp.contents[0]);
        this.lookupModel.setToken(rsp.customerToken);
        this.messageService.sendMessage(new Message(BUS_EVENTS.LOGIN, true));
      }
    }));
  }



  customerLogin(countryCode: Number, mobile: string, pwd: string): Observable<any> {
    const args = {
      countryCode: countryCode,
      mobile: mobile,
      password: pwd,
      ip: this.lookupModel.getUuid()
    };
    return this.dataService.callPostAPI(SRV_OPS.customerLogin, args).pipe(tap((rsp) => {

      if (rsp.statusCode === 0 && rsp.contents) {
        this.lookupModel.setLoggedUser(rsp.contents[0]);
        this.lookupModel.setToken(rsp.customerToken);
        this.messageService.sendMessage(new Message(BUS_EVENTS.LOGIN, true));
      }
    }));
  }
  associateCustomerLogin(countryCode: Number, mobile: string, pwd: string): Observable<any> {
    const args = {
      countryCode: countryCode,
      mobile: mobile,
      password: pwd,
      ip: this.lookupModel.getUuid()
    };
    return this.dataService.callPostAPI(SRV_OPS.associateCustomerLogin, args).pipe(tap((rsp) => {

      if (rsp.statusCode === 0 && rsp.contents) {
        this.lookupModel.setLoggedUser(rsp.contents[0]);
        this.lookupModel.setToken(rsp.customerToken);
        this.messageService.sendMessage(new Message(BUS_EVENTS.LOGIN, true));
      }
    }));
  }

  updateProfile(args: any): Observable<any> {
    args.customerId = this.lookupModel.getCustomerId();
    return this.dataService.callPostAPI(SRV_OPS.updateProfile, args);
  }
  updateAssociatePersonalDetails(args: any): Observable<any> {
    // args.customerId = this.lookupModel.getCustomerId();
    return this.dataService.callPostAPI(SRV_OPS.updateAssociatePersonalDetails, args);
  }
  updateAssociateAddress(args: any): Observable<any> {
    // args.customerId = this.lookupModel.getCustomerId();
    return this.dataService.callPostAPI(SRV_OPS.updateAssociateAddress, args);
  }
  bankAccountDetails(args: any): Observable<any> {
    // args.customerId = this.lookupModel.getCustomerId();
    return this.dataService.callPostAPI(SRV_OPS.bankAccountDetails, args);
  }
  panAccountDetails(args: any): Observable<any> {
    // args.customerId = this.lookupModel.getCustomerId();
    return this.dataService.callPostAPI(SRV_OPS.panAccountDetails, args);
  }
  agentProfile(args: any): Observable<any> {
    args.customerId = this.lookupModel.getCustomerId();
    return this.dataService.callPostAPI(SRV_OPS.agentProfile, args);
  }


  getUserListings(mainModule: any): Observable<any> {
    const args = {
      customerId: this.lookupModel.getCustomerId(),
      moduleId: [this.lookupModel.getModule().moduleId],
      mainModuleId: mainModule.mainModuleId
    };
    return this.dataService.callPostAPI(SRV_OPS.getAllListings, args);
  }
  getProfessionalDetails({ }): Observable<any> {
    const args = {
      customerId: this.lookupModel.getCustomerId(),
    }
    return this.dataService.callPostAPI(SRV_OPS.getProfessionalDetails, args);
  }

  getUserListingsForPg(mainModule: any): Observable<any> {
    const args = {
      customerId: this.lookupModel.getCustomerId(),
      moduleId: [this.lookupModel.getModule().moduleId],
      mainModuleId: mainModule.mainModuleId
    };
    return this.dataService.callPostAPI(SRV_OPS.getAllListingsForPg, args);
  }
  getAllMainModules({ }): Observable<any> {
    return this.dataService.callPostAPI(SRV_OPS.getAllMainModules, {});
  }

  myLeads(mainModule?: any): Observable<any> {
    const args = {
      customerId: this.lookupModel.getLoggedUser().customerId,
      mainModuleId: mainModule?.mainModuleId
    }

    return this.dataService.callPostAPI(SRV_OPS.myLeads, args);
  }

  myLeadsForPg(mainModule?: any): Observable<any> {
    const args = {
      customerId: this.lookupModel.getLoggedUser().customerId,
      mainModuleId: mainModule?.mainModuleId
    }

    return this.dataService.callPostAPI(SRV_OPS.myLeadsForPg, args);
  }
  myViewLeads(mainModule?: any): Observable<any> {
    const args = {
      customerId: this.lookupModel.getLoggedUser().customerId,
      ainModuleId: mainModule?.mainModuleId
    }

    return this.dataService.callPostAPI(SRV_OPS.myViewLeads, args);
  }

  myViewLeadsForPg(mainModule?: any): Observable<any> {
    const args = {
      customerId: this.lookupModel.getLoggedUser().customerId,
      ainModuleId: mainModule?.mainModuleId
    }

    return this.dataService.callPostAPI(SRV_OPS.myViewLeadsForPg, args);
  }

  getLeadInfoForPg(): void {

  }
  // getLeadInfo(mainModule:any): Observable<any> {


  //   const args = {
  //     listings: this.lookupModel.getlistingId(),
  //     customerId: this.lookupModel.getCustomerId(),
  //     mainModuleId:
  //   };
  //   return this.dataService.callPostAPI(SRV_OPS.getLeadInfo, args);
  // }


  logout(): Observable<any> {
    const args = {
      ip: this.lookupModel.getUuid(),
      customerId: this.lookupModel.getLoggedUser().customerId,
      status: 0
    }

    return this.dataService.callPostAPI(SRV_OPS.logout, args);
  }
  getHostelDetailsBasedOnHostelId(args: any): Observable<any> {
    // const args = {
    //   categoryId: this.lookupModel.getCategory().categoryId ? this.lookupModel.getCategory().categoryId : "",
    //   hostelId: this.lookupModel.getSubCategory() && this.lookupModel.getSubCategory().subCategoryId ? [this.lookupModel.getSubCategory().subCategoryId] : subCategoryId,
    //   moduleId: module
    // };
    return this.dataService.callPostAPI(SRV_OPS.getHostelDetailsBasedOnHostelId, args);
  }
  addViewPgListingsToAccount(args: any): Observable<any> {
    args.customerId = this.lookupModel.getCustomerId();
    return this.dataService.callPostAPI(SRV_OPS.addViewPgListingsToAccount, args);
  }

  sendEmailOtp(email: string): Observable<any> {
    const args = {
      email: email,
      moduleStatus: 2
    };
    return this.dataService.callPostAPI(SRV_OPS.sendEmailOtp, args);
  }

  resendEmailOtp(email: string): Observable<any> {
    const args = {
      email: email,
      moduleStatus: 2
    };
    return this.dataService.callPostAPI(SRV_OPS.resendEmailOtp, args);
  }

  verifyEmailOtp(email: string, otp: string): Observable<any> {
    const args = {
      email: email,
      otp: otp,
      moduleStatus: 2
    };
    return this.dataService.callPostAPI(SRV_OPS.verifyEmailOtp, args);
  }

  isEmailExists(email: string): Observable<any> {
    const args = {
      email: email
    };
    return this.dataService.callPostAPI(SRV_OPS.isEmailExists, args);
  }

  favoriteProperties(args): Observable<any> {

    return this.dataService.callPostAPI(SRV_OPS.favoriteProperties, args);
  }
  favoriteProjects(args): Observable<any> {

    return this.dataService.callPostAPI(SRV_OPS.favoriteProjects, args);
  }
  favoritePghostel(args): Observable<any> {

    return this.dataService.callPostAPI(SRV_OPS.favoritePghostel, args);
  }


  getActiveModules(moduleId?: string, countryId?: string): Observable<any> {
    let args = {
      status: 1,
      countryId: [''],
      moduleId: ''
    };

    if (moduleId && countryId) {
      args.countryId = [countryId],
        args.moduleId = moduleId
    } else {
      args.countryId = [this.lookupModel.getCountry().codeId];
      args.moduleId = this.lookupModel.getCountry().moduleId;
    }

    return this.dataService.callPostAPI(SRV_OPS.getActiveModules, args);
  }

  getActiveModulesForPostProperty(moduleId?: string, countryId?: string, vendorTypeId?: string): Observable<any> {
    let args = {
      status: 1,
      countryId: [''],
      moduleId: '',
      vendorTypeId: ''
    };
    if (vendorTypeId) {
      args['vendorTypeId'] = vendorTypeId
    }
    if (moduleId && countryId) {
      args.countryId = [countryId],
        args.moduleId = moduleId
    } else {
      args.countryId = [this.lookupModel.getCountry().codeId];
      args.moduleId = this.lookupModel.getCountry().moduleId;
    }

    return this.dataService.callPostAPI(SRV_OPS.getActiveModulesForPostProperty, args);
  }

  getActiveCategories(moduleId: string): Observable<any> {
    const args = {
      status: 1,
      moduleId: [moduleId]
    };
    return this.dataService.callPostAPI(SRV_OPS.getActiveCategories, args);
  }

  getListingForPagination(args: any): Observable<any> {
    if (this.lookupModel.getLoggedUser() && this.lookupModel.getLoggedUser().listings.length > 0) {
      args.listings = this.lookupModel.getLoggedUser().listings;

    } else if (this.lookupModel.getLoggedUser()) {
      args.customerId = [this.lookupModel.getLoggedUser().customerId]
    } else {
      args.listings = []
      args.customerId = []
    }

    return this.dataService.callPostAPI(SRV_OPS.getListingsBasedOnFiltersForPagination, args);
  }
  getAllPropertiesForModules(moduleId: string): Observable<any> {
    const args = {
      status: 1,
      moduleId: moduleId
    };
    return this.dataService.callPostAPI(SRV_OPS.getAllPropertiesForModules, args);
  }
  getFavoriteProperties(): Observable<any> {
    const args = {
      associateId: this.lookupModel.getLoggedUser().associateId
    };
    return this.dataService.callPostAPI(SRV_OPS.getFavoriteProperties, args);
  }

  getFavoriteHostels(): Observable<any> {
    const args = {
      associateId: this.lookupModel.getLoggedUser().associateId
    };
    return this.dataService.callPostAPI(SRV_OPS.getFavoriteHostels, args);
  }

  getFavoriteProjects(): Observable<any> {
    const args = {
      associateId: this.lookupModel.getLoggedUser().associateId
    };
    return this.dataService.callPostAPI(SRV_OPS.getFavoriteProjects, args);
  }
  getLeadsForProperties(): Observable<any> {
    const args = {
      associateId: this.lookupModel.getLoggedUser().associateId
    };
    return this.dataService.callPostAPI(SRV_OPS.getLeadsForProperties, args);
  }
  getLeadsForProjects(): Observable<any> {
    const args = {
      associateId: this.lookupModel.getLoggedUser().associateId
    };
    return this.dataService.callPostAPI(SRV_OPS.getLeadsForProjects, args);
  }  
  getLeadsForHostels(): Observable<any> {
    const args = {
      associateId: this.lookupModel.getLoggedUser().associateId
    };
    return this.dataService.callPostAPI(SRV_OPS.getLeadsForHostels, args);
  }

  getAllPropertiesForCategories(categoryId: string, subCatId: string, moduleId: string): Observable<any> {
    const args = {
      status: 1,
      categoryId: categoryId,
      subCategoryId: subCatId,
      moduleId: [moduleId]
    };
    return this.dataService.callPostAPI(SRV_OPS.getAllPropertiesForCategories, args);
  }

  getCategoriesForEdit(listingId: string, categoryId: string, subCatId: string, moduleId: string): Observable<any> {
    const args = {
      listingId: listingId,
      categoryId: categoryId,
      subCategoryId: subCatId,
      moduleId: [moduleId]
    };
    return this.dataService.callPostAPI(SRV_OPS.getCategoriesForEdit, args);
  }
  getCustomerProjectsBasedOnProjectId(args: any): Observable<any> {
    if (this.lookupModel.getCustomerId()) {
      args.customerLoginStatus = 1,
        args.customerId = this.lookupModel.getCustomerId()
    }
    return this.dataService.callPostAPI(SRV_OPS.getCustomerProjectsBasedOnProjectId, args);
  }
  addProjectToAccount(args: any): Observable<any> {
    args.customerId = this.lookupModel.getCustomerId();
    return this.dataService.callPostAPI(SRV_OPS.addProjectToAccount, args);
  }

  getActiveMeasurements(): Observable<any> {
    return this.dataService.callPostAPI(SRV_OPS.getActiveMeasurements, { status: 1 });
  }
  getDashboardCount({ }): Observable<any> {
    const args = {
      customerId: this.lookupModel.getCustomerId()
    };
    return this.dataService.callPostAPI(SRV_OPS.getDashboardCount, args);
  }

  addUpdateListings(args: any): Observable<any> {
    args.customerId = this.lookupModel.getCustomerId();
    // args.vendorTypeId = this.appLookupModel.getLoggedUser().vendorTypeId;
    return this.dataService.callPostAPI(SRV_OPS.addUpdateListings, args);
  }
  addUpdatePgListings(args: any): Observable<any> {
    args.customerId = this.lookupModel.getCustomerId();
    // args.vendorTypeId = this.appLookupModel.getLoggedUser().vendorTypeId;
    return this.dataService.callPostAPI(SRV_OPS.addUpdatePgListings, args);
  }

  publishPlan(): Observable<any> {
    // alert(this.lookupModel.getVendorProperty().listingId);
    const args = {
      status: 1,
      listingId: this.lookupModel.getVendorProperty().listingId,
      customerId: this.lookupModel.getCustomerId()
    };
    return this.dataService.callPostAPI(SRV_OPS.publishPlan, args);
  }
  addProjectFinance(prjFinanceArgs:any): Observable<any> {
    alert("here getting")
    const args = {
      ...prjFinanceArgs
    };
    return this.dataService.callPostAPI(SRV_OPS.addProjectFinance, args).pipe(tap((rsp) => {

      if (rsp.statusCode === 0 && rsp.contents) {
        this.lookupModel.setLoggedUser(rsp.contents[0]);
        this.lookupModel.setToken(rsp.customerToken);
        this.messageService.sendMessage(new Message(BUS_EVENTS.LOGIN, true));
      }
    }));
  }


  loanApplication(name: string, mobile: string, email: string, pan: string, loanamount: Number, loantype: string, customerId: string): Observable<any> {
    const args = {
      name: name,
      mobile: mobile,
      email: email,
      pan: pan,
      loanamount: loanamount,
      loantype: loantype,
      customerid: customerId,
      requestFrom: 'Owner'
    };
    return this.dataService.callPostAPI(SRV_OPS.loanApplication, args).pipe(tap((rsp) => {

      if (rsp.statusCode === 0 && rsp.contents) {
        this.lookupModel.setLoggedUser(rsp.contents[0]);
        this.lookupModel.setToken(rsp.customerToken);
        this.messageService.sendMessage(new Message(BUS_EVENTS.LOGIN, true));
      }
    }));
  }
  getListingBasedOnListingId(args: any): Observable<any> {
    if (this.lookupModel.getCustomerId()) {
      args.customerLoginStatus = 1,
        args.customerId = this.lookupModel.getCustomerId()

    }

    return this.dataService.callPostAPI(SRV_OPS.getListingBasedOnListingId, args);
  }

  addBuilderCompany(args: any): Observable<any> {
    args.customerId = this.lookupModel.getLoggedUser().customerId;
    return this.dataService.callPostAPI(SRV_OPS.addBuilderCompany, args)
  }

  getBuilderCompanies(args): Observable<any> {
    args.customerId = this.lookupModel.getLoggedUser().customerId;
    return this.dataService.callPostAPI(SRV_OPS.getBuilderCompanies, args)
  }

  addOngoingProject(args: any): Observable<any> {
    args.customerId = this.lookupModel.getLoggedUser().customerId;
    return this.dataService.callPostAPI(SRV_OPS.addOngoingProject, args)
  }

  addPreviousProject(args: any): Observable<any> {
    args.customerId = this.lookupModel.getLoggedUser().customerId;
    return this.dataService.callPostAPI(SRV_OPS.addPreviousProject, args)
  }

  getCustomerListingsBasedOnListingId(args: any): Observable<any> {
    if (this.lookupModel.getCustomerId()) {
      args.customerLoginStatus = 1,
        args.customerId = this.lookupModel.getCustomerId()
    }
    return this.dataService.callPostAPI(SRV_OPS.getCustomerListingsBasedOnListingId, args);
  }

  getListingsBasedOnFilters(args: any): Observable<any> {
    return this.dataService.callPostAPI(SRV_OPS.getListingsBasedOnFilters, args);
  }

  getLatestListingsBasedOnSubModules(city: string): Observable<any> {
    let cityNew = this.lookupModel.getCurrentLocation().city ? this.lookupModel.getCurrentLocation().city : 'Hyderabad';
    let cityLat;
    let cityLong;
    if (cityNew) {
      cityLat = cityNew.split(['']);
      cityLat.forEach((obj, index) => {
        if (obj == 'ā') {
          cityLat[index] = 'a'
        }
        if (obj == 'ū') {
          cityLat[index] = 'u'
        }
      })
      cityLong = cityLat.join('');
    }

    const args = {
      city: cityLong,
      state: this.lookupModel.getCurrentLocation().region_name,
      countryId: this.lookupModel.getCountry().codeId,
      regionCity: cityLong
    };
    return this.dataService.callPostAPI(SRV_OPS.getLatestListingsBasedOnSubModules, args);
  }

  getHostelsForFilters(args: any): Observable<any> {
    return this.dataService.callPostAPI(SRV_OPS.getHostelsForFilters, args);
  }

  getAllAttribtesForWebsiteFilters(): Observable<any> {
    const subCategoryId = this.lookupModel.getCategory()?.subCategory.length ? this.lookupModel.getCategory()?.subCategory.map((obj) => { return obj.subCategoryId }) : [];
    const args = {
      categoryId: this.lookupModel.getCategory().categoryId,
      subCategoryId: this.lookupModel.getSubCategory() ? this.lookupModel.getSubCategory().subCategoryId : subCategoryId,
      moduleId: [this.lookupModel.getModule().moduleId]
    };
    return this.dataService.callPostAPI(SRV_OPS.getAllAttribtesForWebsiteFilters, args);
  }

  getActiveBudgetsForFilters(moduleId?: string): Observable<any> {
    const args = {
      countryId: this.lookupModel.getCountry().codeId,
      subCategoryId: this.lookupModel.getSubCategory() ? this.lookupModel.getSubCategory().subCategoryId : '',
      moduleId: [moduleId]
    };
    return this.dataService.callPostAPI(SRV_OPS.getActiveBudgetsForFilters, args);
  }

  getAllPgAttributesForWebsiteFilters(module: any): Observable<any> {
    //const subCategoryId = this.lookupModel.getCategory()?.subCategory.length ? this.lookupModel.getCategory()?.subCategory.map((obj) => { return obj.subCategoryId }) : [];
    const args = {
      //categoryId: this.lookupModel.getCategory().categoryId ? this.lookupModel.getCategory().categoryId : "",
      //subCategoryId: this.lookupModel.getSubCategory() && this.lookupModel.getSubCategory().subCategoryId ? [this.lookupModel.getSubCategory().subCategoryId] : subCategoryId,
      moduleId: module
    };
    return this.dataService.callPostAPI(SRV_OPS.getAllPgAttributesForWebsiteFilters, args);
  }

  addListingsToAccount(args: any): Observable<any> {
    args.customerId = this.lookupModel.getCustomerId();
    return this.dataService.callPostAPI(SRV_OPS.addListingsToAccount, args);
  }

  addViewListingsToAccount(args: any): Observable<any> {
    args.customerId = this.lookupModel.getCustomerId();
    return this.dataService.callPostAPI(SRV_OPS.addViewListingsToAccount, args);
  }

  getListingsInfo(): Observable<any> {
    const args = {
      customerId: this.lookupModel.getCustomerId(),
      moduleId: this.lookupModel.getModule().moduleId
    };
    return this.dataService.callPostAPI(SRV_OPS.getListingsInfo, args);
  }



  getContactInfo(args: any): Observable<any> {
    return this.dataService.callPostAPI(SRV_OPS.getContactInfo, args);
  }

  getListingsBasedOnCountry(args: any): Observable<any> {
    return this.dataService.callPostAPI(SRV_OPS.getListingsBasedOnCountry, args);
  }

  getListingsBasedOnCountryAndCity(args: any): Observable<any> {
    return this.dataService.callPostAPI(SRV_OPS.getListingsBasedOnCountryAndCity, args);
  }

  getAllLatestListings(): Observable<any> {
    return this.dataService.callPostAPI(SRV_OPS.getAllLatestListings, {});
  }

  getActiveVendorTypes(): Observable<any> {
    return this.dataService.callPostAPI(SRV_OPS.getActiveVendorTypes, {});
  }
  updateVendortype(arg: any): Observable<any> {
    const args = {
      ...arg,
      customerId: this.lookupModel.getCustomerId()

    }
    //alert("getting here 1")
    return this.dataService.callPostAPI(SRV_OPS.updatevendortype, args);
  }


  addBuilderProject(args: any): Observable<any> {
    args.customerId = this.lookupModel.getLoggedUser().customerId;
    args.companyId = localStorage.getItem('companyId');
    return this.dataService.callPostAPI(SRV_OPS.addBuilderProperty, args)
  }
  getBuilderPropertyInfo({ }): Observable<any> {
    const args = {
      customerId: this.lookupModel.getLoggedUser().customerId,
      companyId: localStorage.getItem('companyId')
    }
    return this.dataService.callPostAPI(SRV_OPS.getBuilderProperties, args)
  }



  getProjectBasedOnProjectId(args: any): Observable<any> {
    return this.dataService.callPostAPI(SRV_OPS.getProjectBasedOnProjectId, args);
  }

  getAllProjectListings(status: number): Observable<any> {
    const args = {
      vendorId: this.lookupModel.getLoggedUser().customerId,
      status: status
    };
    return this.dataService.callPostAPI(SRV_OPS.getAllProjectListings, args);
  }

  getBasicAttributesBasedOnName(args: any): Observable<any> {
    return this.dataService.callPostAPI(SRV_OPS.getBasicAttributesBasedOnName, args)
  }


}
