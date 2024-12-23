import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize";

interface OrderDetailsViewAttributes {
  id: number;
  senderId: number;
  senderFirstName: string;
  senderLastName: string;
  senderEmail: string;
  senderAddress: string;
  senderPhoneNumber: string;
  packageId: number;
  packageWeight: number;
  packageDimension: string;
  packageDeclaredValue: number;
  driverId: number | null;
  driverFirstName: string;
  driverLastName: string;
  latestStatusName: string;
  recipientFirstName: string;
  recipientLastName: string;
  recipientAddress: string;
  trackingNumber: string;
  amount: number;
  currency: string;
  method: string;
}

export class OrderDetailsView
  extends Model<OrderDetailsViewAttributes>
  implements OrderDetailsViewAttributes
{
  public id!: number;
  public senderId!: number;
  public senderFirstName!: string;
  public senderLastName!: string;
  public senderEmail!: string;
  public senderAddress!: string;
  public senderPhoneNumber!: string;
  public packageId!: number;
  public packageWeight!: number;
  public packageDimension!: string;
  public packageDeclaredValue!: number;
  public driverId!: number | null;
  public driverFirstName!: string;
  public driverLastName!: string;
  public latestStatusName!: string;
  public recipientFirstName!: string;
  public recipientLastName!: string;
  public recipientAddress!: string;
  public trackingNumber!: string;
  public amount!: number;
  public currency!: string;
  public method!: string;
}

OrderDetailsView.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.INTEGER,
    },
    senderFirstName: {
      type: DataTypes.STRING,
    },
    senderLastName: {
      type: DataTypes.STRING,
    },
    senderEmail: {
      type: DataTypes.STRING,
    },
    senderAddress: {
      type: DataTypes.STRING,
    },
    senderPhoneNumber: {
      type: DataTypes.STRING,
    },
    packageId: {
      type: DataTypes.INTEGER,
    },
    packageWeight: {
      type: DataTypes.FLOAT,
    },
    packageDimension: {
      type: DataTypes.STRING,
    },
    packageDeclaredValue: {
      type: DataTypes.FLOAT,
    },
    driverId: {
      type: DataTypes.INTEGER,
    },
    driverFirstName: {
      type: DataTypes.STRING,
    },
    driverLastName: {
      type: DataTypes.STRING,
    },
    latestStatusName: {
      type: DataTypes.STRING,
    },
    recipientFirstName: {
      type: DataTypes.STRING,
    },
    recipientLastName: {
      type: DataTypes.STRING,
    },
    recipientAddress: {
      type: DataTypes.STRING,
    },
    trackingNumber: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.DECIMAL,
    },
    currency: {
      type: DataTypes.STRING,
    },
    method: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "order_details_v",
    timestamps: false,
    freezeTableName: true,
  }
);
