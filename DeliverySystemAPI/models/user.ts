import { Model, DataTypes, Optional, Association } from "sequelize";
import { sequelize } from "../config";
import { UserType } from "./userType";

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userTypeId: number;
  address: string;
  phoneNumber: string;
  refreshToken?: string | null;
  refreshTokenExpiry?: Date | null;
  issuedAt?: Date | null;
  revokedAt?: Date | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public userTypeId!: number;
  public address!: string;
  public phoneNumber!: string;
  public refreshToken!: string | null;
  public refreshTokenExpiry!: Date | null;
  public issuedAt!: Date | null;
  public revokedAt!: Date | null;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public static associations: {
    userType: Association<User, UserType>;
  };

  static associate(models: any) {
    // User belongs to UserType
    User.belongsTo(models.UserType, {
      foreignKey: "userTypeId",
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  }
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refreshTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    issuedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    revokedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
  }
);
