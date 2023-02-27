require("dotenv").config();
const express = require("express");
const { createUser } = require("./controllers/user");
const { hashPassword } = require("./middlewares/auth");
const {users} = require("./models");
const app = express();
const PORT = process.env.APP_PORT || 5001;

// body parser
const bodyParser = express.json();
app.use(bodyParser);

// routes
const routes = require("./routes");
app.use("/api", routes);

createUser()


// listen
app.listen(PORT, () => {
  console.log(` app listening at http://localhost:${PORT}`);
});
