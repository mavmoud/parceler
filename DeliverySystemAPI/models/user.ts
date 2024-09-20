export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public userTypeId: number;
  public address: string;
  public phoneNumber: string;

  // Token fields
  public refreshToken: string | null;
  public refreshTokenExpiry: Date | null;
  public issuedAt: Date | null;
  public revokedAt: Date | null;

  constructor(other?: Partial<User>) {
    this.id = other?.id || 0;
    this.firstName = other?.firstName || "";
    this.lastName = other?.lastName || "";
    this.email = other?.email || "";
    this.password = other?.password || "";
    this.userTypeId = other?.userTypeId || 1;
    this.address = other?.address || "";
    this.phoneNumber = other?.phoneNumber || "";
    this.refreshToken = other?.refreshToken || null;
    this.refreshTokenExpiry = other?.refreshTokenExpiry || null;
    this.issuedAt = other?.issuedAt || null;
    this.revokedAt = other?.revokedAt || null;
  }
}
