import { Model, DataTypes, Optional, Association } from "sequelize";
import { sequelize } from "../config/database";
import { User } from "./user";

interface UserTypeAttributes {
  id: number;
  name: string;
}

interface UserTypeCreationAttributes
  extends Optional<UserTypeAttributes, "id"> {}

export class UserType
  extends Model<UserTypeAttributes, UserTypeCreationAttributes>
  implements UserTypeAttributes
{
  public id!: number;
  public name!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    users: Association<UserType, User>;
  };

  static associate(models: any) {
    // UserType has many Users
    UserType.hasMany(models.User, {
      foreignKey: "userTypeId",
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  }
}

UserType.init(
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
    modelName: "UserType",
    tableName: "UserTypes",
  }
);
