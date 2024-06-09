const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to Database Successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
