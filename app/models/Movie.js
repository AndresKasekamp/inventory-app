import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  "movies",
  `${process.env.DB_USER}`,
  `${process.env.DB_PASS}`,
  {
    host: `${process.env.INVENTORY_DATABASE_DNS}`,
    dialect: "postgres",
    port: 5432,
    define: {
      timestamps: false,
    },
  }
);

await sequelize.authenticate();
console.log("Connection has been established successfully.");

export const Movie = sequelize.define("movies", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
