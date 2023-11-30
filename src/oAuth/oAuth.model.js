import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../common/helpers/database.helper";

class OAuth extends Model {}

OAuth.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        tokens: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        emailAddress: {
            type: DataTypes.STRING,
        },
    },
    { sequelize, timestamps: true, tableName: "oauth" }
);

export default OAuth;
