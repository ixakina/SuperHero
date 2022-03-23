import {AbstractControl, FormControl} from "@angular/forms";
import {LocStorKeys} from "./constants";
import {User} from "./interfaces";

export const getRandomHeroId = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const matchedValuesValidator = (control: AbstractControl): { [key: string]: boolean } => {
  const name = control.get('username');
  const email = control.get('email');
  const password = control.get('password');
  if (name && email && password &&
    (password.value.includes(name.value) || password.value.includes(email.value))) {
    return {matchedValues: true}
  }
  return null;
}

export const searchInputSpacesValidator = (control: AbstractControl): { [key: string]: boolean } => {
  if (control.value !== control.value?.trim()) {
    return {spaces: true};
  }
  return null;
}

export const uniqEmailValidator = (control: AbstractControl): { [key: string]: boolean } => {
  if (JSON.parse(localStorage.getItem(LocStorKeys.USERS))?.find((user: User) =>
    user.email === control.value?.trim())
  ) {
    return {uniq: true};
  }
  return null;
}

export const strictDomainValidator = (control: AbstractControl): { [key: string]: boolean } => {
  const allowedDomains = ['.com', '.net', '.org', '.co', '.us'];
  if (
    !allowedDomains.includes(control.value?.slice(control.value.lastIndexOf('.')))
  ) {
    return {domain: true}
  }
  return null;
}

export const strictSymbolsValidator = (control: AbstractControl): { [key: string]: boolean } => {
  if (control.value && control.value?.split('@')[1].length !== 5) {
    return {symbols: true}
  }
  return null;
}

export const strictDotsValidator = (control: FormControl): { [key: string]: boolean } => {
  if (control.value?.slice(0, control.value.indexOf('@')).split('.').length > 4) {
    return {dots: true}
  }
  return null;
}

export const strictContentValidator = (control: AbstractControl): { [key: string]: boolean } => {
  const allowedSymbols = ['$', '%', '.', '&', '!', '-'];
  const isUppercaseChar = control.value?.split('').some((char: string) => char == char.toUpperCase());
  const isSpecialSymbols = control.value?.split('').some((char: string) => allowedSymbols.includes(char));
  const isNumber = control.value?.split('').some((char: string) => isFinite(+char));
  if (isNumber === false || isSpecialSymbols === false || isUppercaseChar === false) {
    return {content: true}
  }
  return null;
}

export const nameCaseValidator = (control: AbstractControl): { [key: string]: boolean } => {
  const value = control.value?.split('');
  const isOneUppercaseChar = value?.filter((char: string) => char !== char.toLowerCase()).length === 1;
  const indexOfUppercaseChar = value?.findIndex((char: string) => char !== char.toLowerCase());
  const isCamelcase = isOneUppercaseChar &&
    indexOfUppercaseChar !== 0 &&
    indexOfUppercaseChar !== (value.length - 1) &&
    !value?.includes('-') &&
    !value?.includes(' ');

  const isKebabCase = control.value?.includes('-') &&
    control.value?.split('-').length === 2 &&
    control.value?.indexOf('-') !== 0 &&
    control.value?.indexOf('-') !== (control.value.length - 1) &&
    control.value?.split('-').every((char: string) => char === char.toLowerCase());

  const isSpaceCase = control.value?.split(' ').length === 2 &&
    control.value?.split(' ').every((word: string) => word.length) &&
    control.value?.split(' ').every((word: string) => word[0] === word[0].toUpperCase())

  if (!isCamelcase && !isKebabCase && !isSpaceCase) {
    return {case: true}
  }
  return null;
}


