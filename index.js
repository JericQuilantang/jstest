const express = require("express");
const userRouter = require("./src/routes/userRouter");
const cors = require("cors");
const morgan = require("morgan");
//write
//fs.writeFile()
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/v1", userRouter);
const port = 8000;

app.listen(port, () => {
  console.log("Server is running on port 8000");
});
