import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RsbLookupModel } from 'src/app/common/model/rsb-lookup.model';
import { RsbService } from 'src/app/service/rsb.service';
function panValidator(control) {
  const panPattern = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  if (control.value && !panPattern.test(control.value)) {
    return { invalidPan: true };
  }
  return null;
}
@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  Loanform: FormGroup;
  constructor(
    private fb: FormBuilder,
    private rsbService: RsbService,
    private rsblookup:RsbLookupModel
  ) { }


  ngOnInit(): void {

    this.Loanform = this.fb.group({
      name: ['', [Validators.required]],
      mobile: ['',[Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      pan: ['', [Validators.required, panValidator]],
      loanamount: ['', Validators.required],
      loantype:['',Validators.required]

    });
  }
  Applyloan() {
    if (!this.Loanform.valid) {
      this.validateAllFormFields(this.Loanform); 
      return;
    } 
    const customer=this.rsblookup.getLoggedUser().customerId;
    const name=this.name.value;
    const mobile=this.mobile.value;
    const email=this.email.value;
    const pan=this.pan.value;
    const loanamount=this.loanamount.value;
    const loantype=this.loantype.value;
    const customerId=customer;
    this.rsbService.loanApplication(name,mobile,email,pan,loanamount,loantype,customerId).subscribe((rsp) => {
    })
  }
  validateAllFormFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);             
      if (control instanceof FormControl) {             
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.validateAllFormFields(control);            
      }
    });
  }
  get name() { return this.Loanform.get('name'); }
  get mobile() { return this.Loanform.get('mobile'); }
  get email() { return this.Loanform.get('email'); }
  get pan() { return this.Loanform.get('pan'); }
  get loanamount() { return this.Loanform.get('loanamount'); }
  get loantype() { return this.Loanform.get('loantype'); }
  get f() { return this.Loanform.controls; }
  get panFormControl() {
    return this.Loanform.controls;
  }



}
