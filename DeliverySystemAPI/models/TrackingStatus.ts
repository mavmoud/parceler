import { Model, DataTypes, Optional, Association } from "sequelize";
import { sequelize } from "../config/database";
import { Order } from "./order";

interface TrackingStatusAttributes {
  id: number;
  statusName: string;
}

interface TrackingStatusCreationAttributes
  extends Optional<TrackingStatusAttributes, "id"> {}

export class TrackingStatus
  extends Model<TrackingStatusAttributes, TrackingStatusCreationAttributes>
  implements TrackingStatusAttributes
{
  public id!: number;
  public statusName!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    orders: Association<TrackingStatus, Order>;
  };

  static associate(models: any) {
    TrackingStatus.hasMany(models.OrderStatusHistory, {
      foreignKey: "statusId",
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  }
}

TrackingStatus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    statusName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "TrackingStatus",
    tableName: "TrackingStatus",
  },
);
