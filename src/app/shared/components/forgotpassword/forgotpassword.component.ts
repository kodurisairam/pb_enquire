import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { RsbService } from 'src/app/service/rsb.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { RsbLookupModel } from 'src/app/common/model/rsb-lookup.model';
import { MessageService, BUS_EVENTS } from 'src/app/common/events/message.service';

import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatternValidatorsService } from 'src/app/common/services/pattern-validators.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  @Input() successLink: string;
  forgotPwdForm: FormGroup;
  loginForm: FormGroup;
  success_message: string;
  error_message: string;
  loginSubs: any;
  mobileOtpCheck: boolean = false;
  mobileOtpError: boolean = false;
  mobileotpVerified: boolean = false;
  mobileExists: boolean = false;
  mobileOtpSent: boolean = false;
  mobileOtpResent: boolean = false;
  mobileOtpMaxFlag: boolean = false;
  loginBlocked: boolean = false;
  incorrectOtp: boolean = false;
  loginFailed: boolean = false;
  mobileOtpVerified: boolean = false;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  onlyCountries = [];
  loadView: boolean = false;
  selectedISOCountry;
  signup: boolean = false;
  passwordError: boolean = false;
  passworderr: string;
  passwordStrength: string;
  submitted: boolean = false;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;



  constructor(
    private router: Router,
    private fb: FormBuilder,
    // activeModal: NgbActiveModal,
    private rsbService: RsbService,
    private lookupModel: RsbLookupModel,
    private messageService: MessageService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) {

  }

  ngOnInit(): void {
  

    this.forgotPwdForm = this.fb.group({
      mobileOtp: ['', [Validators.required]],
      password: ['', [
        Validators.required,
        PatternValidatorsService.patternValidators({
          hasNumber: true,
          hasCapitalCase: true,
          hasSmallCase: true,
          hasSpecialCharacters: true,
          hasLength:true
        }),
      ]],
      confirmPwd:['',[Validators.required]],
      mobile: ['', [Validators.required]],
    },{ validator: this.passwordMissMatch });



    const localCountrys = this.lookupModel.getCountryList();
    this.onlyCountries = [];
    localCountrys.forEach(country => {
      let isoCountry = this.findCountryIso(country.twoDigitCountryCode);
      if (isoCountry) {
        this.onlyCountries.push(isoCountry);
      }
    });
    const country = this.lookupModel.getCountry();
    if (country) {
      let isoCountry = this.findCountryIso(country.twoDigitCountryCode);
      if (isoCountry) {
        this.selectedISOCountry = isoCountry;
      }
    }
  }
  passwords: string = '';


  
  

  findCountryIso(countryCode: string): string {
    let isoKey = Object.keys(CountryISO).find(item => CountryISO[item] === countryCode.toLowerCase());
    if (isoKey) {
      return CountryISO[isoKey];
    } else {
      return '';
    }
  }

  sign(): void {
    this.signup = true;
  }

  loginPanel(): void {
    this.signup = false;
  }
  forgotPwd(): void {

    this.router.navigate(["forgotpassword"])



  }
  changeMobile(): void {
    this.mobileExists = false;
    this.mobileOtpSent = false;
    this.mobileOtpMaxFlag = false;
    this.mobileotpVerified = false;
    this.error_message = '';
    this.success_message = '';
    this.incorrectOtp = false;
    this.mobile.enable();
  }

  sendOtp(mobile: any): void {
    this.mobileotpVerified = false;
    this.mobileOtpSent = false;
    this.mobileOtpMaxFlag = false;
    this.success_message = '';
    this.error_message = '';
    this.incorrectOtp = false;

    const e164Number = mobile.e164Number;
    const mobileNumber = e164Number.replace(mobile.dialCode, '');
    this.rsbService.sendMobileOtpForForgotPassword(mobileNumber, parseInt(mobile.dialCode).toString()).subscribe((rsp) => {
      if (rsp.statusCode === 0) {
        this.mobile.disable();
        this.mobileOtpSent = true;
      } else if (rsp.statusCode === 1) {
        this.mobileOtpMaxFlag = true;
      } else if (rsp.statusCode === 3) {
        this.mobileExists = true;
      }
      else if (rsp.statusCode === 2) {
        this.mobileOtpMaxFlag = true;
      }
      else {
        this.mobileOtpError = true;
      }
    }, (err) => {
      this.mobileOtpSent = false;
    });
  }

  resendOtp(mobile: any): void {
    this.mobileotpVerified = false;
    this.mobileOtpResent = false;
    this.mobileOtpMaxFlag = false;
    this.success_message = '';
    this.error_message = '';
    this.incorrectOtp = false;

    const e164Number = mobile.e164Number;
    const mobileNumber = e164Number.replace(mobile.dialCode, '');
    this.rsbService.resendMobileOtp(mobileNumber, parseInt(mobile.dialCode).toString()).subscribe((rsp) => {
      if (rsp.statusCode === 1) {
        this.loginBlocked = true;
        this.mobileOtpSent = false;
        this.mobileOtpResent = false;
        this.error_message = 'Login has been blocked by due to Maximum OTP send Limit per day is completed, please try after 24 hours'
      } else if (rsp.statusCode === 2) {
        this.mobileOtpMaxFlag = true;
        this.mobileOtpSent = true;
        this.mobileOtpResent = true;
        this.error_message = 'Mobile reached maximum otp limit.please try after 24 hours';
      } else {
        this.mobileOtpSent = true;
        this.mobileOtpResent = true;
        this.success_message = 'Re-sent otp successfully.';
      }
    }, (err) => {
      this.mobileOtpSent = false;
      this.mobileOtpResent = false;
    });
  }

  validatePassword(password) {
    const val = password.target.value;
    if (val.length < 6 || val.length > 10) {
      this.passwordError = true
    } else {
      this.passwordError = false;
    }
  }
  
  backtoLogin(){
    this.router.navigate(['login'])
  }
 

  // redirectRoute(): void {
  //   console.log("logged user", this.lookupModel.getLoggedUser());
  //   this.loginSubs = this.lookupModel.getLoginRouting();
  //   switch (this.loginSubs) {
  //     case "main":
  //       this.router.navigate([''])
  //       break;
  //     case "postProperty":
  //       //logic need tefo write here
  //       if (this.lookupModel.getLoggedUser().activeStatus === 1) {
  //         if (this.lookupModel.getLoggedUser().vendorTypeName.toUpperCase() == "BUILDER") {
  //           window.location.href = 'https://builder.pillarblocks.com';
  //         }
  //         else if (this.lookupModel.getLoggedUser().vendorTypeName.toUpperCase() == "AGENT") {
  //           window.location.href = 'https://agent.pillarblocks.com';
  //         }
  //         else if (this.lookupModel.getLoggedUser().vendorTypeName.toUpperCase() == "OWNER") {
  //           window.location.href = 'https://owner.pillarblocks.com';
  //         }
  //       }
  //       else {
  //         this.router.navigate(['selectVendorType'])
  //       }
  //       break;
  //     case "loans":
  //       this.router.navigate(['loans'])
  //       break;
  //     default:
  //       this.router.navigate([''])
  //       break;
  //   }
  // }

  clearEmailStatus(): void {
    this.mobileOtpSent = false;
    this.mobileOtpError = false;
    this.mobileExists = false;
    this.mobileOtpVerified = false;
    this.mobileOtpResent = false;
    this.mobileOtpMaxFlag = false;
    this.loginFailed = false;
  }

  passwordMissMatch(formGroup: FormGroup) {
    const password = formGroup.get('password').value;
    const confirmPwd = formGroup.get('confirmPwd').value;
    if (password && confirmPwd) {
      if (password === confirmPwd) {
        formGroup.get('confirmPwd').setErrors(null);
      } else {
        formGroup.get('confirmPwd').setErrors({ misMatch: true });
      }
    }
  }
 
  forgotPassword(): void {
    this.clearEmailStatus()
    this.mobileOtpVerified = false;
    const mobile = this.mobile.value;
    const e164Number = mobile.e164Number;
    const mobileNumber = e164Number.replace(mobile.dialCode, '');
    this.rsbService.forgotPwdVerifyMobileOtp(this.mobileOtp.value, this.password.value,this.confirmPwd.value,
      parseInt(mobile.dialCode),
      mobileNumber,
      mobile.countryCode).subscribe((rsp) => {
        this.mobileOtpCheck = true;
        if (rsp.statusCode === 0) {
          this.lookupModel.setProfileDisplayType(0);
          this.mobileOtpVerified = true;
          this.lookupModel.setMobileType(1);
          this.router.navigate(['login']);
        } else {
          this.mobileOtpVerified = false;
        }
      }, (err) => {
        this.mobileOtpSent = false;
      });
  }

  redirect(): void {

    if (this.successLink) {
      if (this.successLink === "postProperty") {
        this.lookupModel.setRedirectRoute("postProperty");
        //alert(this.lookupModel.getLoggedUser().activeStatus)
        if (this.lookupModel.getLoggedUser().activeStatus === 1) {
          window.open(this.lookupModel.getLoggedUser().redirectUrl + '/home', '_self');
        } else {

          this.router.navigate(['profile']);
          this.close();
        }
      }
      else {
        this.lookupModel.setRedirectRoute("postRequirement");
        if (this.lookupModel.getLoggedUser().activeStatus === 1) {
          window.open(this.successLink, '_self');
        } else {

          this.router.navigate(['profile']);
          this.close();
        }
      }
    } else if (this.successLink === 'contactOwner') {

      this.close();
    }
    else {

      this.lookupModel.setRedirectRoute("login");
      if (this.lookupModel.getLoggedUser().activeStatus === 0) {
        this.router.navigate(['profile']);
        this.close();
      } else {
        this.router.navigate(['']);
        this.close();
      }

    }
  }
  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
  toggleConfirmPassword(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  close(rsn?: any): void {
    //this.activeModal.close(rsn);
  }
  get mobile() { return this.forgotPwdForm.get('mobile'); }
  get mobileOtp() { return this.forgotPwdForm.get('mobileOtp'); }
  get password() { return this.forgotPwdForm.get('password'); }
  get confirmPwd() { return this.forgotPwdForm.get('confirmPwd'); }

}
