const express = require("express");
const app = express();

const routes = require("./src/routes/routes-v1");
routes(app);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening to port http://localhost:${port}`);
});
