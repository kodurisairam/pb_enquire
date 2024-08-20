import { Injectable } from '@angular/core';
import { AbstractControl,ValidationErrors,ValidatorFn } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class PatternValidatorsService {
  constructor() { }
  static patternValidators(options?: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null; // If the control value is empty, validation passes
      }

      const value: string = control.value;
      var errors = {hasLength : false,hasNumber:false, hasCapitalCase : false, hasSmallCase : false, hasSpecialCharacters: false};
      if (options.hasLength && value.length < 10 || value.length > 10) {
        errors.hasLength = true
      }
      if (options.hasNumber && !/[0-9]/.test(value)) {
        errors.hasNumber = true;
      }
      if (options.hasCapitalCase && !/[A-Z]/.test(value)) {
        errors.hasCapitalCase = true;
      }
      if (options.hasSmallCase && !/[a-z]/.test(value)) {
        errors.hasSmallCase = true;
      }
      if (options.hasSpecialCharacters && !/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
        errors.hasSpecialCharacters = true;
      }
      
      const hasError = Object.values(errors).some(error => error);
      return hasError ? errors : null;
      
    };
  }


}


