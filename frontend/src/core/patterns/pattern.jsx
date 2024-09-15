export const alphaNumericPattern = /^[a-zA-Z0-9_ .-]*$/;
export const email =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;
export const password =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;

export const fullnameRequired = "Please enter the name";
export const emailRequired = "Please enter the email";
export const emailvalidMessage = "Please enter the valid email";
export const passwordRequired = "Please enter the Old password";
export const acceptMessageRequired = "Please accept the terms and conditions";
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
export const lowerCase = /[a-z]/;
export const upperCase = /[A-Z]/;
// eslint-disable-next-line no-useless-escape
export const SpecialCharacters = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
export const emailRgx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;
export const numberRgx = /[-+]?[0-9]*\.?[0-9]+$|^$/;
export const passwordValidMessage = "At least one uppercase & lowercase";
export const inputMaxLength = 60;
export const keyValue = "id";
export const fieldRgx = /^[a-zA-Z0-9_ .-]*$/;
export const SpecialCharactersErrorMsg = "Special characters not allowed";
export const mobileRgx = /^([+]\d{2})?\d{10}$/;
export const ZibCodeRgx = /^(\d{4}|\d{6})$/;
export const acNumberRgx = /^(?:[0-9]{11}|[0-9]{2}-[0-9]{3}-[0-9]{6})$/;
export const ifscRgx = /^[A-Z]{4}0[A-Z0-9]{6}$/;
export const urlRgx =
  // eslint-disable-next-line no-useless-escape
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
export const defaultMaxDate = new Date();
export const aplhaNumericRegex = /^[a-zA-Z0-9]+$/;
export const alphaNumeric = /^[a-zA-Z0-9]+$/;
export const floatingRegex =
  /^[+-]?0(?![0-9]).[0-9]*(?![.])$|^[+-]?[1-9]{1}[0-9]*.[0-9]*$|^[+-]?.[0-9]+$/;
export const nameregex = /^[a-zA-Z ]*$/;
