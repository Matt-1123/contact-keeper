// entry point to back end
const express = require("express"); // this is called Common JS, which is used to bring in modules

// initalize express into variable
const app = express();

// add route
app.get("/", (req, res) =>
  res.json({ msg: "Welcome to the Contact Keeper API" })
);

// First looks for an environment variable called PORT, which will be used in production. Uses port 5000 in development
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
