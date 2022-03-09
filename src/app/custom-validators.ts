import {FormControl} from "@angular/forms";

export class CustomValidators {
  static strictEmail (control: FormControl): {[key: string]: boolean} {
    const allowedDomains = ['.com', '.net', '.org', '.co', '.us'];
    if (
      allowedDomains.includes(control.value.slice(control.value.lastIndexOf('.'))) ||
      control.value.slice(control.value.indexOf('@') + 1).length <= 5 ||
      control.value.slice(0, control.value.indexOf('@')).lastIndexOf('.') < 3
    ) {
      return {mailFormat: true}
    }
    return null;
  }

  static strictPassword (control: FormControl): {[key: string]: boolean} {
    const allowedSymbols = ['$', '%', '.', '&', '!'];
    const value = control.value.split('');
    if (
     allowedSymbols.some((char: string) => value.includes(char)) ||
     value.some((char: string) => typeof (Number(char)) === 'number' && !isNaN(Number(char))) ||
     value.some((char: string) => char !== char.toLowerCase())
    ) {
      return {mailFormat: true}
    }
    return null;
  }
}
