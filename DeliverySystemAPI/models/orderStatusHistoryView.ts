import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config";

interface orderStatusHistoryViewAttributes {
  id: number;
  orderId: number;
  statusId: number;
  statusName: string;
  createdAt: Date;
}

export class OrderStatusHistoryView
  extends Model<orderStatusHistoryViewAttributes>
  implements orderStatusHistoryViewAttributes
{
  public id!: number;
  public orderId!: number;
  public statusId!: number;
  public statusName!: string;
  public createdAt!: Date;
}

OrderStatusHistoryView.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statusName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "order_status_history_v",
    timestamps: false,
    freezeTableName: true,
  }
);
