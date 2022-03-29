import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

export function decimalInputValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const decimalRegex = /^-?\d*[.,]?\d{0,2}$/;
    const isValid = decimalRegex.test(control.value);
    return isValid ? null : {
      decimal: {
        value: control.value,
        message: "Please enter a value in decimal data type."
      }
    };
  };
}
