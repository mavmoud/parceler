import { Model, DataTypes, Optional, Association } from "sequelize";
import { sequelize } from "../config/database";
import { Order } from "./order";

interface TrackingStatusAttributes {
  id: number;
  name: string;
}

interface TrackingStatusCreationAttributes
  extends Optional<TrackingStatusAttributes, "id"> {}

export class TrackingStatus
  extends Model<TrackingStatusAttributes, TrackingStatusCreationAttributes>
  implements TrackingStatusAttributes
{
  public id!: number;
  public name!: string;

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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "TrackingStatus",
    tableName: "TrackingStatus",
  }
);
