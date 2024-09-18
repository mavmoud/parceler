export interface TextFieldsConfig {
  label: string;
  name: string;
}

export interface initialValuesCreateAccount {
  fName: string;
  lName: string;
  emailCreateAccount: string;
  passwordCreateAccount: string;
  confirmPassword: string;
  accountTypeCreateAccount: string;
}

export interface initialValuesSignIn {
  emailSignIn: string;
  passwordSignIn: string;
  accountTypeSignIn: string;
}