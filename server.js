// entry point to back end
const express = require("express"); // this is called Common JS, which is used to bring in modules. To use import, Babel or something similar would be needed.
const connectDB = require("./config/db");

// initalize express into variable
const app = express();

// Connect Database
connectDB();

// add route
app.get("/", (req, res) =>
  res.json({ msg: "Welcome to the Contact Keeper API" })
);

// Define Routes (every backend route will start with '/api')
// Each app.use(middleware) is called every time a request is sent to the server.
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// First looks for an environment variable called PORT, which will be used in production. Uses port 5000 in development
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
