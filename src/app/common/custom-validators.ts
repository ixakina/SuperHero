import {FormControl} from "@angular/forms";

export class CustomValidators {
  static strictEmail(control: FormControl): { [key: string]: boolean } {
    const allowedDomains = ['.com', '.net', '.org', '.co', '.us'];
    if (
      allowedDomains.includes(control.value?.slice(control.value.lastIndexOf('.')))
      // control.value.slice(control.value.indexOf('@') + 1).length <= 5 ||
      // control.value.slice(0, control.value.indexOf('@')).lastIndexOf('.') < 3
    ) {
      console.log(control.value.slice(control.value.lastIndexOf('.')))
      return {mailFormat: true}
    }
    return null;
  }

  static strictPassword(control: FormControl): { [key: string]: boolean } {
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

  // static strictUsername(control: FormControl): { [key: string]: boolean } {
  //   const upLetter = control.value.split('').filter((letter: string) => letter.charCodeAt(0) >=65 && letter.charCodeAt(0) <=90);
  //
  //   if (
  //         control.value.split('-').length !== 2
  //   ) {
  //     console.log(control.value.split('-').toString());
  //     return {kebabCase: true}
  //   }
  //
  //
  //   return null;
  // }
}
