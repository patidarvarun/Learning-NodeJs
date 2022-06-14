const app = require("./routes/index");
require("dotenv").config();
const port = process.env.PORT || "5000";
const DatabaseConn = require("./config/connection");
DatabaseConn();
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
