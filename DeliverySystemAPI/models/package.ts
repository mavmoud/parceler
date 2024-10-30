import { Model, DataTypes, Optional, Association } from "sequelize";
import { sequelize } from "../config/database";
import { Order } from "./order";

interface PackageAttributes {
  id: number;
  weight: number;
  dimension: string;
  declaredValue: number;
}

interface PackageCreationAttributes extends Optional<PackageAttributes, "id"> {}

export class Package
  extends Model<PackageAttributes, PackageCreationAttributes>
  implements PackageAttributes
{
  public id!: number;
  public weight!: number;
  public dimension!: string;
  public declaredValue!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    orders: Association<Package, Order>;
  };

  static associate(models: any) {
    Package.hasOne(models.Order, {
      foreignKey: "packageId",
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  }
}

Package.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dimension: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    declaredValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Package",
    tableName: "Packages",
  }
);
