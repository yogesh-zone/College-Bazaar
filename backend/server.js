const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./Config/database");

// if app on development then use config we defined here
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "./backend/Config/config.env" });
}

//database connection
connectDB();

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`server is working on http:\\localhost:${port}`);
});
