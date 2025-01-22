require("dotenv").config();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then(() => console.log("DB connected successful"));

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
