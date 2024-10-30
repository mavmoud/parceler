import { Model, DataTypes, Optional, Association } from "sequelize";
import { sequelize } from "../config/database";
import { Order } from "./order";
import { TrackingStatus } from "./trackingStatus";

interface OrderStatusHistoryAttributes {
  id: number;
  orderId: number;
  statusId: number;
}

interface OrderStatusHistoryCreationAttributes
  extends Optional<OrderStatusHistoryAttributes, "id"> {}

export class OrderStatusHistory
  extends Model<
    OrderStatusHistoryAttributes,
    OrderStatusHistoryCreationAttributes
  >
  implements OrderStatusHistoryAttributes
{
  public id!: number;
  public orderId!: number;
  public statusId!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    orders: Association<OrderStatusHistory, Order>;
    status: Association<OrderStatusHistory, TrackingStatus>;
  };

  static associate(models: any) {
    OrderStatusHistory.belongsTo(models.Order, {
      foreignKey: "orderId",
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    Order.belongsTo(models.TrackingStatus, {
      foreignKey: "statusId",
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  }
}

OrderStatusHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
  },
  {
    sequelize,
    modelName: "OrderStatusHistory",
    tableName: "OrderStatusHistory",
  }
);
