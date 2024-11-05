export class User {
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public userTypeId: number;
  public address: string;
  public phoneNumber: string;

  constructor(others?: Partial<User>) {
    this.firstName = others?.firstName || "";
    this.lastName = others?.lastName || "";
    this.email = others?.email || "";
    this.password = others?.password || "";
    this.userTypeId = others?.userTypeId || 1;
    this.address = others?.address || "";
    this.phoneNumber = others?.phoneNumber || "";
  }
}
