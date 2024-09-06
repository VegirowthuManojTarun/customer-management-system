// backend/index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const customerRoutes = require("./routes/customerRoutes");
const path = require("path");
const app = express();
const port = 5555;

// app.use(cors());
app.use(bodyParser.json());

app.use(express.static("build"));
app.use("/", customerRoutes);

// app.get("*",(req,res)=>{
//   res.sendFile(path.join(__dirname,"/build/index.html"));
// })

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
