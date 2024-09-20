export class UserType {
  public id: number;
  public typeName: string;

  constructor(other?: Partial<UserType>) {
    this.id = other?.id || 0;
    this.typeName = other?.typeName || "";
  }
}
