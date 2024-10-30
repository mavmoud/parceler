import { Model, DataTypes, Optional, Association } from "sequelize";
import { sequelize } from "../config/database";
import { Order } from "./order";

interface PaymentAttributes {
  id: number;
  stripeId: string;
  amount: number;
  currency: string;
  method: number;
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, "id"> {}

export class Payment
  extends Model<PaymentAttributes, PaymentCreationAttributes>
  implements PaymentAttributes
{
  public id!: number;
  public stripeId!: string;
  public amount!: number;
  public currency!: string;
  public method!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    orders: Association<Payment, Order>;
  };

  static associate(models: any) {
    Payment.hasOne(models.Order, {
      foreignKey: "PaymentId",
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  }
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    stripeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "Payments",
  }
);
