const express = require("express");

const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv/config");
// const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
const api = process.env.API_URL;

app.use(cors());
app.options("/{*any}", cors());

//middleware
app.use(express.json());
app.use(morgan("tiny"));
// app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

// ROUTES
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Database connection is ready");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is running http://localhost:3000");
});
