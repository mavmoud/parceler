export class Order {
  public id: number;
  public senderId: number;
  public senderFirstName: string;
  public senderLastName: string;
  public senderEmail: string;
  public senderAddress: string;
  public senderPhoneNumber: string;
  public driverId: number;
  public driverFirstName: string;
  public driverLastName: string;
  public packageId: number;
  public packageWeight: number;
  public packageDimension: string;
  public packageDeclaredValue: number;
  public latestStatusName: string;
  public recipientFirstName: string;
  public recipientLastName: string;
  public recipientAddress: string;
  public trackingNumber: string;
  public amount: number;
  public currency: string;
  public method: string;

  constructor(others?: Partial<Order>) {
    this.id = others?.id || 0;
    this.senderId = others?.senderId || 0;
    this.senderFirstName = others?.senderFirstName || "";
    this.senderLastName = others?.senderLastName || "";
    this.senderEmail = others?.senderEmail || "";
    this.senderAddress = others?.senderAddress || "";
    this.senderPhoneNumber = others?.senderPhoneNumber || "";
    this.driverId = others?.driverId || 0;
    this.driverFirstName = others?.driverFirstName || "";
    this.driverLastName = others?.driverLastName || "";
    this.packageId = others?.packageId || 0;
    this.packageWeight = others?.packageWeight || 0;
    this.packageDimension = others?.packageDimension || "";
    this.packageDeclaredValue = others?.packageDeclaredValue || 0;
    this.latestStatusName = others?.latestStatusName || "";
    this.recipientFirstName = others?.recipientFirstName || "";
    this.recipientLastName = others?.recipientLastName || "";
    this.recipientAddress = others?.recipientAddress || "";
    this.trackingNumber = others?.trackingNumber || "";
    this.amount = others?.amount || 0;
    this.currency = others?.currency || "";
    this.method = others?.method || "";
  }
}
