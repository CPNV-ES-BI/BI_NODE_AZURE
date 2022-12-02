const express = require("express");
const app = express();

const routes = require("./routes/api");
routes(app);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening to port http://localhost:${port}`);
});
