export class Shipment {
  public id: number;
  public senderId: number;
  public recipientName: string;
  public recipientAddress: string;
  public statusId: number;
  public trackingNumber: string;

  constructor(other?: Partial<Shipment>) {
    this.id = other?.id || 0;
    this.senderId = other?.senderId || 0;
    this.recipientName = other?.recipientName || "";
    this.recipientAddress = other?.recipientAddress || "";
    this.statusId = other?.statusId || 0;
    this.trackingNumber = other?.trackingNumber || "";
  }
}
